import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { translate } from 'helpers/Translate';
import { actions } from 'redux-utils';
import { CLIENT_ID } from 'constants/config';
import LoginComponent from './LoginComponent';
import { Overlay } from 'components/loading';
import { Notification } from 'helpers';
import { DEFAULT_REDIRECT } from 'constants/config';

class LoginContainer extends Component {
    componentDidMount() {
        this.checkRedirect(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.checkRedirect(nextProps);
    }

    checkRedirect = nextProps => {
        const { authActions, location: { search = '' }, history, auth: { successLogout, isAuthenticated } } = nextProps;
        const query = queryString.parse(search);
        const { redirect = '' } = query;
        if (successLogout) {
            authActions.resetLogout();
        }

        if (isAuthenticated) {
            history.push(redirect || DEFAULT_REDIRECT);
        }
    };

    onSubmit = values => {
        const { authActions, translate } = this.props;
        Object.assign(values, { client_id: CLIENT_ID });
        authActions
            .login(values)
            .then(res => {
                Notification.success('loginSuccess', translate);
            })
            .catch(({ data = {} }) => {
                Notification.error(data.message || 'noResponseFromTheServer', translate);
            });
    };

    render() {
        const { auth } = this.props;
        return (
            <div>
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <Overlay loading={auth.hasRequestLogin} />
                <LoginComponent auth={auth} onSubmit={this.onSubmit} />
            </div>
        );
    }
}

LoginContainer.propTypes = {
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const { auth, language } = state;
    return {
        auth,
        translate: translate(language)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
