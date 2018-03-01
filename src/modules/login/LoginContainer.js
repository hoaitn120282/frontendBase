import React, { PureComponent, Fragment } from 'react';
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

class LoginContainer extends PureComponent {
    constructor() {
        super();
        this.state = {
            isFetching: false
        };
    }
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
        this.setState({
            isFetching: true
        });
        authActions
            .login(values)
            .then(res => {
                Notification.success('loginSuccess', translate);
            })
            .catch(({ data = {} }) => {
                Notification.error(data.message || 'noResponseFromTheServer', translate);
            })
            .finally(() => {
                this.setState({
                    isFetching: false
                });
            });
    };

    render() {
        const { isFetching } = this.state;
        const { auth } = this.props;
        return (
            <Fragment>
                <Helmet title="login" />
                <Overlay loading={isFetching} />
                <LoginComponent auth={auth} onSubmit={this.onSubmit} />
            </Fragment>
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
