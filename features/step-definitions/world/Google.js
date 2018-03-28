module.exports = class Google {
  async open() {
    await browser.url('https://google.com')
  }

  async search(searchString) {
    // `element` is a global Protractor helper:
    // https://www.protractortest.org/#/api?view=ElementFinder
    await $('[name="q"]').setValue(searchString)
    await browser.keys("\uE007")
  }

  async expectInResults(text) {
    // The idea of waiters is that instead of getting text of the `#search`
    // element *right now* and asserting that it contains an expected string,
    // we *wait* this element to eventually contain the text. Technically,
    // Protractor will ping Selenium every ~100 ms until the expectation is
    // fulfilled or until the timeout is reached.
    //
    // In most of the cases in UI tests it's a good idea to make assertions
    // through waiters, since UI is asynchronous by its nature: there are
    // always some network requests, some animations, etc. and as result
    // it's hard to guess the UI state at the current given moment: today
    // when you click on a button it changes its label immediately, tomorrow
    // designers add an animation to the button and the test fails. But if
    // you *wait for elements to enter* some state instead of *asserting
    // them to be* in the state right know, you can forget about that problem.
    //
    // `waiter` is a predicate Protractor will call to check the expectation.
    // '#search' is the block where Google displays all found results.
    await browser.waitForVisible(`//*[@id = 'search'][contains(text(), ${text})]`)
  }
}
