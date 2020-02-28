const { BeforeAll, Before } = require('cucumber');

const nock = require('nock');

BeforeAll(function (next) {
    nock.disableNetConnect();
    nock.enableNetConnect(/localhost|127.0.0.1/);

    nock.emitter.on('no match', (req, interceptor, body) => {
        if (![ 'localhost', '127.0.0.1' ].includes(req.hostname)) {
            console.error(`===> No mock matching request for "${ interceptor ? interceptor.method : req.method } ${ interceptor ? interceptor.href : req.href }"`);
        }
    });

    next();
});

Before(function (scenario, next) {
    nock.cleanAll();
    next();
});
