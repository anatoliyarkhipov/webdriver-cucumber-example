// Every file in the `step_definitions` folder and its sub folders
// will be loaded automatically by Cucumber in the alphabet order,
// as they are ordered in the file system.
//
// A step defined once through `Given`, `When` or `Then` can be
// used in any `.feature` file. Step definition files aren't
// bound to a specific `.feature` file in any way.
//
// Keep steps as simple as possible. Consider them a glue between
// Gherkin syntax and a "real" interaction code that is placed
// somewhere behind the `World` class. That way you will avoid
// a lot of duplication between steps.

const { Given, When, Then } = require('cucumber')

Given(/^I am on the google page$/, async function() {
  // `this` here it's an instance of `World` placed in `world/_world.js`
  // `this.google` is an instance of `Google` instantiated in the `World`'s constructor
  //
  // `World` instance is recreated for every *Scenario* in
  // the feature file. To be able to use it, the step should
  // be defined with regular `function`, because an arrow
  // function will be bound the current module context.
  await this.google.open()
})

/**
 * When I search for "cats"
 *
 * `searchString` will contain "cats"
 */
When(/^I search for "([^"]+)"$/, async function(searchString) {
  await this.google.search(searchString)
})


/**
 * Then I see that results contain:
 *   | 1 | cats  |
 *   | 2 | funny |
 *   | 3 | music |
 *
 * `dataTable` will contain a DataTable instance:
 * https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/data_table_interface.md
 */
Then(/^I see that results contain:$/, async function(dataTable) {
  // `texts` will contain { 1: "cats", 2: "funny", 3: "serious" }
  // There is no reason to have the numbers in the data table in this
  // specific test, they present just to show how `rowsHash` works.
  const texts = dataTable.rowsHash()

  for(let key in texts) {
    const text = texts[key]

    // In this cycle we sequentially wait for search
    // results to contain every expected text.
    await this.google.expectInResults(text)
  }
})
