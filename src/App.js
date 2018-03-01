import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';

import { actions } from 'redux-utils';
import appRoutes from 'routes';
import { Cube as Loading } from 'components/loading';

import { FB_APP_ID } from 'constants/config';
import Request from 'helpers/Request';
import dependencies from 'helpers/Dependencies';

dependencies.register('primaryColor', '#c0a328');

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
    async componentWillMount() {
        const { commonActions, authActions } = this.props;

        const promsList = [commonActions.getConfig()];
        if (Request.token) {
            promsList.push(authActions.me());
        }

        await Promise.all(promsList)
            .then(() => {
                this.setState({ isFetching: false });
            })
            .catch(() => {
                this.setState({ isFetching: false });
            });
    }
    componentDidMount() {
        if (FB_APP_ID) {
            window.fbAsyncInit = function() {
                window.FB.init({
                    appId: FB_APP_ID,
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v2.10'
                });
            };
            (function(d, s, id) {
                const fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                const js = d.createElement(s);
                js.id = id;
                js.src = '//connect.facebook.net/vi_VN/sdk/debug.js';
                fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'facebook-jssdk');
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
