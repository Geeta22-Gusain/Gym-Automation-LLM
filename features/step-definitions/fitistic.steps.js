import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser, $ } from '@wdio/globals';
import { selectors } from '../../config/selectors.js';
async function visible(key) {
  const element = await $(selectors[key]);
  await element.waitForDisplayed({ timeout: 15000 });
  return element;
}
async function tap(key) { await (await visible(key)).click(); }
async function fill(key, value) { await (await visible(key)).setValue(value); }
Given('Fitistic is on the email login screen', async () => {
  await browser.activateApp('com.yuviso.fitistic');
  await visible('email'); await visible('password');
});
When('I log in with the configured test account', async () => {
  const { FITISTIC_EMAIL, FITISTIC_PASSWORD } = process.env;
  if (!FITISTIC_EMAIL || !FITISTIC_PASSWORD) throw new Error('Set FITISTIC_EMAIL and FITISTIC_PASSWORD securely in .env or your process environment.');
  await fill('email', FITISTIC_EMAIL); await fill('password', FITISTIC_PASSWORD);
  if (await browser.isKeyboardShown()) await browser.hideKeyboard();
  await tap('loginSubmit');
});
Given('Fitistic is on the terms screen after Google signup', async () => {
  await browser.activateApp('com.yuviso.fitistic'); await visible('agreeContinue');
});
When('I accept the terms and continue', async () => {
  const checkbox = await visible('agreement');
  if ((await checkbox.getAttribute('checked')) !== 'true') await checkbox.click();
  await tap('agreeContinue');
});
When('I choose Build Muscle and Strength', async () => { await tap('goal'); await tap('continue'); });
When('I enter a height of 175 cm and weight of 70 kg', async () => {
  await fill('height', '175'); await fill('weight', '70');
  if (await browser.isKeyboardShown()) await browser.hideKeyboard();
});
Then('the calculated BMI is 22.9', async () => { await visible('bmi'); });
When('I continue to activity selection', async () => { await tap('continue'); });
When('I select Moderately Active and complete setup', async () => { await tap('activity'); await tap('complete'); });
Then('the Fitistic home dashboard is displayed', async () => { await visible('home'); });
