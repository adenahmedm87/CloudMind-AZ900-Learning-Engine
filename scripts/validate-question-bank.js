#!/usr/bin/env node
"use strict";

// Lightweight structural validation for the in-page AZ-900 question bank.
// Run from the repository root: node scripts/validate-question-bank.js
const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");

const html = fs.readFileSync("index.html", "utf8");
const declaration = html.indexOf("const questions=[");
assert.notEqual(declaration, -1, "Could not find const questions=[ in index.html");
const open = html.indexOf("[", declaration);
let depth = 0;
let quote = null;
let escaped = false;
let close = -1;

for (let i = open; i < html.length; i += 1) {
  const ch = html[i];
  if (quote !== null) {
    if (escaped) escaped = false;
    else if (ch === "\\\\") escaped = true;
    else if (ch === quote) quote = null;
    continue;
  }
  if (ch === '"' || ch === "'" || ch === "`") {
    quote = ch;
    continue;
  }
  if (ch === "[") depth += 1;
  else if (ch === "]") {
    depth -= 1;
    if (depth === 0) {
      close = i;
      break;
    }
  }
}

assert.notEqual(close, -1, "Question array does not have a matching closing bracket");
const questions = vm.runInNewContext(html.slice(open, close + 1));
assert.ok(Array.isArray(questions), "Question bank must evaluate to an array");
assert.ok(questions.length > 0, "Question bank must not be empty");

const ids = new Set();
const domainCounts = new Map();
const errors = [];

for (const [index, q] of questions.entries()) {
  const label = `question at array index ${index}`;
  if (!q || typeof q !== "object") {
    errors.push(`${label}: expected an object`);
    continue;
  }
  if (!Number.isInteger(q.id)) errors.push(`${label}: id must be an integer`);
  else if (ids.has(q.id)) errors.push(`duplicate question id ${q.id}`);
  else ids.add(q.id);

  for (const field of ["topic", "objective", "q", "why", "trap", "example"]) {
    if (typeof q[field] !== "string" || !q[field].trim()) {
      errors.push(`question ${q.id ?? index}: missing or empty ${field}`);
    }
  }
  if (!Array.isArray(q.options) || q.options.length < 2) {
    errors.push(`question ${q.id ?? index}: must have at least two options`);
  } else if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.options.length) {
    errors.push(`question ${q.id ?? index}: correct answer index is out of range`);
  }
  if (typeof q.topic === "string") domainCounts.set(q.topic, (domainCounts.get(q.topic) || 0) + 1);
}

if (ids.size !== questions.length) errors.push("question IDs are not unique");
if (errors.length) {
  console.error("Question-bank validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`PASS: ${questions.length} questions; unique IDs; required fields, objective labels, and answer indexes valid.`);
for (const [topic, count] of domainCounts) {
  console.log(`- ${topic}: ${count} (${(count / questions.length * 100).toFixed(1)}%)`);
}
