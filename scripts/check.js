import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { Parser, AstBuilder, GherkinClassicTokenMatcher } from '@cucumber/gherkin';
import { IdGenerator } from '@cucumber/messages';
for (const file of ['wdio.conf.js', 'config/selectors.js', 'features/step-definitions/fitistic.steps.js']) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
for (const file of ['features/login.feature', 'features/onboarding.feature']) {
  const parser = new Parser(new AstBuilder(IdGenerator.incrementing()), new GherkinClassicTokenMatcher());
  const document = parser.parse(readFileSync(file, 'utf8'));
  if (!document.feature?.children.length) throw new Error(`No scenarios in ${file}`);
  console.log(`Parsed ${file}`);
}
console.log('JavaScript and Gherkin checks passed. Device tests require an Android device and verified selectors.');
