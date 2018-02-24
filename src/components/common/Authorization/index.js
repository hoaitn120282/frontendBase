if (process.env.REACT_APP_IWD_ENV === 'production') {
    module.exports = require('./Authorization.prod');
} else {
    module.exports = require('./Authorization.dev');
}
