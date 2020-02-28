const { Given } = require('cucumber');

const prepareMock = require('./helpers/prepareMock');

Given(/^there is a (POST|PUT|GET|DELETE) endpoint at "(https?:\/\/[^\/]*)([^"]*)" which will(:? return "([^"]*)" with)? a status of (\d+)(:? when called with "([^"]*)")?$/, function (verb, host, path, file, status, body) {
    const mock = prepareMock(verb, host, path, status, file, body);
    this.addMock(mock);
});
