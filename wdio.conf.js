import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
if (existsSync('.env')) loadEnvFile('.env');
export const config = {
  runner: 'local', hostname: process.env.APPIUM_HOST || '127.0.0.1',
  port: Number(process.env.APPIUM_PORT || 4723), path: '/',
  specs: ['./features/**/*.feature'], maxInstances: 1,
  capabilities: [{ platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    ...(process.env.ANDROID_UDID ? { 'appium:udid': process.env.ANDROID_UDID } : {}),
    'appium:appPackage': 'com.yuviso.fitistic',
    'appium:noReset': true, 'appium:autoLaunch': false,
    'appium:newCommandTimeout': 180 }],
  logLevel: 'warn', framework: 'cucumber', reporters: ['spec'],
  waitforTimeout: 15000, connectionRetryCount: 0,
  cucumberOpts: { require: ['./features/step-definitions/*.js'],
    timeout: 60000, tagExpression: process.env.CUCUMBER_TAGS || '@login' }
};
