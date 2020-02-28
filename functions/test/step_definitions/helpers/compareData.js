const { expect } = require('chai');

const compareData = (expected, actual, message = '', exact = true) => {
    const expectedKeys = Object.keys(expected);
    const actualKeys = Object.keys(actual);

    expect(actualKeys).to[ exact ? 'have' : 'contain' ].members(expectedKeys);

    expectedKeys.map((key) => {
        const errorMessage = message ? `${ message } for field "${ key }"` : `error found on "${ key }" field`;

        let check;
        if (typeof expected[ key ] === 'string') {
            check = expected[ key ].match(/\[([^\]]*)\]/) || expected[ key ];
            if (check instanceof Array) {
                expected[ key ] = expected[ key ].replace(check[ 0 ], '');
            }
        }

        switch (expected[ key ]) {
            case 'UUID':
                expect(actual[ key ], errorMessage).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
                break;
            case 'ARRAY':
                expect(actual[ key ], errorMessage).to.be.an.instanceof(Array);
                if (check instanceof Array) {
                    expect(actual[ key ], errorMessage).to.have.length(check[ 1 ]);
                }
                break;
            case 'OBJECT':
                expect(actual[ key ], errorMessage).to.be.an('object');
                if (check instanceof Array) {
                    expect(actual[ key ], errorMessage).to[ exact ? 'have' : 'contain' ].keys(check[ 1 ].split(','));
                }
                break;
            default:
                expect(actual[ key ], errorMessage).to.deep.equal(expected[ key ]);
        }
    });
};

module.exports = compareData;
