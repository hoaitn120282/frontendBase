if (process.env.REACT_APP_IWD_ENV === 'production') {
    module.exports = require('./Guard.prod');
} else {
    module.exports = require('./Guard.dev');
}
