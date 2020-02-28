const { Then } = require('cucumber');
const { expect } = require('chai');

const parseData = require('./helpers/parseData');
const compareData = require('./helpers/compareData');

Then(/^there should be a response that matches:$/, function (data) {
    data = parseData(data.hashes());
    compareData(data[ 0 ], this.response);
});

Then(/^there should be a response containing a field "([^"]+)" that matches:$/, function (field, data) {
    data = parseData(data.hashes());
    expect(Object.keys(this.response)).to.include(field);
    compareData(data[ 0 ], this.response[ field ]);
});

Then(/^there should be a response containing an array "([^"]+)" where row (\d+) matches:$/, function (field, row, data) {
    data = parseData(data.hashes());
    expect(Object.keys(this.response)).to.include(field);
    expect(this.response[ field ]).to.be.an('array');
    compareData(data[ 0 ], this.response[field][ --row ]);
});
