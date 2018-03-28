const { setWorldConstructor } = require('cucumber')
const Google = require('./Google')

// Will be available in every step definition as `this`.
// Make sure that step is defined with a regular `function`,
// because a arrow function will be bound to the current context.
class CustomWorld {
  constructor() {
    this.google = new Google()
  }
}

setWorldConstructor(CustomWorld)
