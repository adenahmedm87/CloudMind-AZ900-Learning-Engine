#!/usr/bin/env node
"use strict";

// Lightweight structural validation for the in-page AZ-900 question bank.
// Run from the repository root: node scripts/validate-question-bank.js
const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");

const html = fs.readFileSync("index.html", "utf8");

// Compile every inline script without executing browser-dependent code. This catches
// syntax errors in the UI/session logic even when a live browser is unavailable.
const scriptBodies = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
  .map(match => match[1])
  .filter(source => source.trim());
assert.ok(scriptBodies.length > 0, "Expected inline JavaScript in index.html");
for (const [index, source] of scriptBodies.entries()) {
  new vm.Script(source, { filename: "index.html inline script " + (index + 1) });
}

// The history selector is a display filter, not the active session mode.
const sidebarStart = html.indexOf("function renderSidebar(){");
const sidebarEnd = html.indexOf("function renderQuestion(){", sidebarStart);
assert.notEqual(sidebarStart, -1, "Could not find renderSidebar");
assert.ok(sidebarEnd > sidebarStart, "Could not find renderSidebar boundary");
const sidebarSource = html.slice(sidebarStart, sidebarEnd);
assert.match(sidebarSource, /selectedHistory/, "History filter should have separate display state");
assert.doesNotMatch(sidebarSource, /state\.mode\s*=/, "History filter must not mutate the active session mode");
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
    else if (ch === "\\") escaped = true;
    else if (ch === quote) quote = null;
    continue;
  }
  if (ch === '"' || ch === "'" || ch.charCodeAt(0) === 96) {
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
assert.equal(questions.length, 103, "Expected 103 questions; the bank may be incomplete");

const ids = new Set();
const stems = new Map();
const allowedTopics = new Set(["Cloud concepts", "Azure architecture", "Management & governance"]);
const domainCounts = new Map();
const errors = [];

for (const [index, q] of questions.entries()) {
  const label = "question at array index " + index;
  if (!q || typeof q !== "object") {
    errors.push(label + ": expected an object");
    continue;
  }
  if (!Number.isInteger(q.id)) errors.push(label + ": id must be an integer");
  else if (ids.has(q.id)) errors.push("duplicate question id " + q.id);
  else ids.add(q.id);

  if (typeof q.topic === "string" && !allowedTopics.has(q.topic)) {
    errors.push("question " + (q.id ?? index) + ": unexpected topic domain " + JSON.stringify(q.topic));
  }
  if (typeof q.q === "string" && q.q.trim()) {
    const normalizedStem = q.q.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (stems.has(normalizedStem)) {
      errors.push("duplicate question stem on questions " + stems.get(normalizedStem) + " and " + q.id);
    } else {
      stems.set(normalizedStem, q.id);
    }
  }

  for (const field of ["topic", "objective", "q", "why", "trap", "example"]) {
    if (typeof q[field] !== "string" || !q[field].trim()) {
      errors.push("question " + (q.id ?? index) + ": missing or empty " + field);
    }
  }
  if (!Array.isArray(q.options) || q.options.length < 2) {
    errors.push("question " + (q.id ?? index) + ": must have at least two options");
  } else {
    if (q.options.some(option => typeof option !== "string" || !option.trim())) {
      errors.push("question " + (q.id ?? index) + ": every answer option must be a non-empty string");
    }
    const normalizedOptions = q.options.map(option => String(option).trim().toLowerCase());
    if (new Set(normalizedOptions).size !== normalizedOptions.length) {
      errors.push("question " + (q.id ?? index) + ": answer options must be unique");
    }
    if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.options.length) {
      errors.push("question " + (q.id ?? index) + ": correct answer index is out of range");
    }
  }
  if (typeof q.topic === "string") domainCounts.set(q.topic, (domainCounts.get(q.topic) || 0) + 1);
}

if (ids.size !== questions.length) errors.push("question IDs are not unique");
for (let id = 1; id <= 103; id += 1) {
  if (!ids.has(id)) errors.push("missing question id " + id);
}
if (errors.length) {
  console.error("Question-bank validation failed:");
  for (const error of errors) console.error("- " + error);
  process.exit(1);
}

console.log("PASS: " + questions.length + " questions; unique IDs; required fields, objective labels, and answer indexes valid.");
for (const [topic, count] of domainCounts) {
  console.log("- " + topic + ": " + count + " (" + (count / questions.length * 100).toFixed(1) + "%)");
}
