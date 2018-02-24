if (process.env.REACT_APP_IWD_ENV === 'production') {
    module.exports = require('./RenderView.prod');
} else {
    module.exports = require('./RenderView.dev');
}
