import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';

import { actions } from 'redux-utils';
import HomeComponent from './HomeComponent';

class HomePage extends PureComponent {
    render() {
        const { auth, authActions } = this.props;
        return (
            <Fragment>
                <Helmet title="Home" />

                <HomeComponent auth={auth} authActions={authActions} />
            </Fragment>
        );
    }
}

HomePage.propTypes = {
    auth: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
