const parseData = (data) => {
    let parsed = [];
    for (let row of data) {
        for (let field in row) {
            try {
                row[ field ] = JSON.parse(row[ field ]);
            } catch (ex) { }
        }
        parsed = [ ...parsed, row ];
    }
    return parsed;
};

module.exports = parseData;
