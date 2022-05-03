const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'public')
    },
    mode: "development",
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 3000
    }
}