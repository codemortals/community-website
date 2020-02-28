const fs = require('fs');
const nock = require('nock');
const path = require('path');

const { expect } = require('chai');

const prepareMock = (restVerb, endpointHost, endpointPath, responseStatus = 200, responseFile, requestFile) => {
    let mock = nock(endpointHost);

    if ([ 'POST', 'PUT' ].includes(restVerb)) {
        mock = mock.filteringPath(/.*/, '*');
        mock = mock.intercept('*', restVerb, (requestBody) => {
            if (!requestFile) {
                return true;
            }

            const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'mocks', requestFile)).toString());
            expect(requestBody).to.deep.equal(data);
            return true;
        });
    } else if ([ 'GET', 'DELETE' ].includes()) {
        mock = mock.intercept(endpointPath, restVerb);
    } else {
        mock = mock.intercept('*', restVerb);
    }

    mock = mock.times(1);

    if (responseFile) {
        mock = mock.replyWithFile(responseStatus, path.join(__dirname, '..', '..', 'mocks', responseFile));
    } else {
        mock = mock.reply(responseStatus);
    }

    return mock;
};

module.exports = prepareMock;
