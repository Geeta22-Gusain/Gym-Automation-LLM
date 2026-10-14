// Screenshot-derived candidates, NOT verified against the Android element tree.
// Replace with accessibility IDs (~name) or resource IDs from Appium Inspector.
const text = value => `android=new UiSelector().text("${value}")`;
export const selectors = {
  email: 'android=new UiSelector().className("android.widget.EditText").instance(0)',
  password: 'android=new UiSelector().className("android.widget.EditText").instance(1)',
  // Log In appears twice: this candidate selects the bottom submit control.
  loginSubmit: '(//*[@text="Log In"])[last()]',
  agreement: 'android=new UiSelector().className("android.widget.CheckBox")',
  agreeContinue: text('Agree & Continue'),
  goal: text('Build Muscle & Strength'),
  continue: text('CONTINUE'),
  height: 'android=new UiSelector().className("android.widget.EditText").instance(0)',
  weight: 'android=new UiSelector().className("android.widget.EditText").instance(1)',
  bmi: text('22.9'),
  activity: text('Moderately Active (3–5 days/wk)'),
  complete: text('COMPLETE & START'),
  home: text("Today's Workout")
};
