import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';

import { actions } from 'redux-utils';
import appRoutes from 'routes';
import { Cube as Loading } from 'components/loading';

// import DevTools from 'containers/DevTools';
// import Request from 'helpers/Request';
import dependencies from 'helpers/Dependencies';

dependencies.register('primaryColor', '#c0a328');

const mapStateToProps = state => {
    const { notifi, auth, language } = state;
    return {
        notifi,
        auth,
        language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        commonActions: bindActionCreators(actions.commonActions, dispatch)
    };
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: true
        };
    }
    getChildContext() {
        return dependencies;
    }
    componentWillMount() {
        const { commonActions } = this.props;
        const promsList = [];
        // authActions.me();
        // if (Request.token) {
        //     promsList.push(this.props.dispatch(authActions.me()));
        // }
        commonActions.init();
        Promise.all(promsList)
            .then(() => {
                this.setState({ isFetching: false });
            })
            .catch(() => {
                this.setState({ isFetching: false });
            });
    }
    componentDidMount() {
        // const { notifiActions } = this.props;
        // setInterval(() => {
        //     // document.title = Date.now();
        //     notifiActions.incrementNotifi();
        // }, 2000);
        // window.fbAsyncInit = function() {
        //     window.FB.init({
        //         appId: '296879230789501',
        //         autoLogAppEvents: true,
        //         xfbml: true,
        //         version: 'v2.10'
        //     });
        // };
        // (function(d, s, id) {
        //     var js,
        //         fjs = d.getElementsByTagName(s)[0];
        //     if (d.getElementById(id)) return;
        //     js = d.createElement(s);
        //     js.id = id;
        //     js.src = '//connect.facebook.net/vi_VN/sdk/debug.js';
        //     fjs.parentNode.insertBefore(js, fjs);
        // })(document, 'script', 'facebook-jssdk');
    }

    render() {
        const { auth } = this.props;
        const { isFetching } = this.state;

        return (
            <Fragment>
                <Helmet htmlAttributes={{ lang: 'en' }} defaultTitle="Qsoft" titleTemplate={`Qsoft - %s`} />
                {!isFetching && appRoutes(auth)}
                {isFetching && (
                    <Fragment>
                        <div style={{ height: '100%' }} className="d-flex justify-content-center align-items-center">
                            <Loading loading={isFetching} />
                        </div>
                    </Fragment>
                )}
                {/* <DevTools /> */}
            </Fragment>
        );
    }
}

App.propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    authActions: PropTypes.object.isRequired,
    commonActions: PropTypes.object.isRequired
};

App.childContextTypes = {
    data: PropTypes.object,
    get: PropTypes.func,
    register: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
