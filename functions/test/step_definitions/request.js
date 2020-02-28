const { When } = require('cucumber');

const parseData = require('./helpers/parseData');

When(/^I call the "([^"]*)" endpoint with data:$/, async function (endpoint, data) {
    data = parseData(data.hashes());
    await this.callFunction(endpoint, data[0]);
});

When(/^I call the "([^"]*)" endpoint with no data$/, async function (endpoint) {
    await this.callFunction(endpoint);
});
