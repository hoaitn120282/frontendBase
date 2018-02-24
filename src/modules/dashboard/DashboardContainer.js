import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';

import { actions } from 'redux-utils';
import DashboardComponent from './DashboardComponent';
class DashboardContainer extends PureComponent {
    render() {
        const { auth, authActions } = this.props;
        return (
            <Fragment>
                <Helmet title="Dashboard" />

                <DashboardComponent auth={auth} authActions={authActions} />
            </Fragment>
        );
    }
}

DashboardContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
