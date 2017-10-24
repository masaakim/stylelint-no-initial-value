const testRule = require("stylelint-test-rule-tape")
const noInitialValue = require("..")
const ruleName = noInitialValue.ruleName

testRule(noInitialValue.rule, {
  ruleName: noInitialValue.ruleName,
  config: null,

  accept: [
    {
      code: `
        .rule {
          font-size: 12px;
        }
      `
    },
    {
      code: `
        .rule {
          font-size: medium;
        }
      `
    },
    {
      code: `
        .rule {
          font-size: initial;
        }
      `
    },
  ],

  reject: [
    {
      code: `
        .rule {
          height: auto;
        }
      `,
      message: `Initial value (${ruleName})`,
    },
  ]
})
