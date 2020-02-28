const functions = require('firebase-functions-test')();

const { setWorldConstructor } = require('cucumber');

class World {

    constructor() {
        this.mocks = [];
        this.functions = require('../../lib/index.js');
        this.setConfig({
            google: { places_key: 'xxxxxxxxxx' },
            sendgrid: { api_key: 'xxxxxxxxxx' }
        });
    }

    setConfig(config) {
        functions.mockConfig(config);
    }

    addMock(mock) {
        this.mocks = [ ...this.mocks, mock ];
    }

    async callFunction(name, data) {
        const result = await functions.wrap(this.functions[ name ])(data);

        for (let mock of this.mocks) {
            mock.done();
        }

        this.response = result;
        return result;
    }

}

setWorldConstructor(World);
