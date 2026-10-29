import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { localizedPath, languageAlternates } from '../lib/i18n/routing.ts';

// Run on Node >=24: node --test tests/i18n.test.mjs
// Check actual translation calls so new text cannot silently fall back to English.
function translationKeys(file) {
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const keys = [];
  function visit(node) {
    if (ts.isCallExpression(node) && node.expression.getText(source) === 't' && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) keys.push(node.arguments[0].text);
    if (ts.isPropertyAssignment(node) && ['title', 'description', 'category'].includes(node.name.getText(source)) && ts.isStringLiteral(node.initializer)) keys.push(node.initializer.text);
    ts.forEachChild(node, visit);
  }
  visit(source);
  return keys;
}

test('language paths round-trip without duplicating the prefix or changing anchors', () => {
  for (const url of ['/', '/#projects', '/projects/artifact-gateway', '/privacy-policy', '/legal-notice?from=footer#contact']) {
    const de = localizedPath(url, 'de');
    assert.equal(localizedPath(de, 'de'), de);
    assert.equal(localizedPath(de, 'en'), url);
  }
  assert.equal(localizedPath('/development', 'en'), '/development');
  assert.equal(localizedPath('/de', 'en'), '/');
});

test('metadata pairs canonical language routes', () => {
  const result = languageAlternates('/de/projects/artifact-gateway');
  assert.equal(result.canonical, '/de/projects/artifact-gateway');
  assert.equal(result.languages.en, '/projects/artifact-gateway');
  assert.equal(result.languages.de, '/de/projects/artifact-gateway');
});

test('all UI copy and project descriptions have German translations', () => {
  const dictionary = JSON.parse(fs.readFileSync('lib/i18n/ui.de.json', 'utf8'));
  for (const name of ['AboutSection', 'ContactSidebar', 'Footer', 'HeroSection', 'ProjectsSection', 'TechStackSection']) {
    for (const key of translationKeys(path.join('components', name + '.tsx'))) assert.ok(dictionary[key], `${name}: ${key}`);
  }
});

test('all server article and legal text has German translations', () => {
  const dictionary = JSON.parse(fs.readFileSync('content/translations/de.json', 'utf8'));
  for (const name of fs.readdirSync('content/pages').filter(name => name.endsWith('.tsx'))) {
    for (const key of translationKeys(path.join('content/pages', name))) assert.ok(dictionary[key], `${name}: ${key}`);
  }
});
