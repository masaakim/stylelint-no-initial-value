const stylelint = require("stylelint")
const data = require("mdn-data").css.properties

const ruleName = "morishitter/no-initial-value"
const messages =  stylelint.utils.ruleMessages(ruleName, {
  unexpected: "Initial value",
})
const isNotInheritedProp = prop => !data[prop].inherited
const isInitialValue = (prop, value) => data[prop].initial === value

module.exports = stylelint.createPlugin(ruleName, (opts) => (root, result) => {
  var validOptions = stylelint.utils.validateOptions({
    ruleName,
    result,
    actual: opts
  })

  if (!validOptions) return

  root.walkDecls(decl => {
    console.log(decl)
    console.log(isNotInheritedProp(decl.prop))
    console.log(decl.prop)
    console.log(decl.value)
    console.log(isInitialValue(decl.prop, decl.value))
    if (isNotInheritedProp(decl.prop)) {
      if (isInitialValue(decl.prop, decl.value)) {
        stylelint.utils.report({
          ruleName,
          result,
          decl,
          message: messages.unexpected,
          line: decl.source.start.line,
          column: decl.source.start.column,
        })
      }
    }
  })
})
