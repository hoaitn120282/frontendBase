import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'redux-utils';
// import routes from 'components/routes';

import Header from 'components/header/Header';
import styles from './style.scss';

class MainLayout extends PureComponent {
    constructor() {
        super();

        this.state = {
            navMini: false
        };
    }

    componentWillMount() {}

    toggleNav = e => {
        e.preventDefault();
        this.setState({ navMini: !this.state.navMini });
    };
    hideNav = e => {
        e.preventDefault();
        this.setState({ navMini: false });
    };

    onLogout = () => {
        const { authActions } = this.props;
        authActions.logout();
    };

    stateGo = link => {
        const { history } = this.props;
        history.push(link);
    };

    render() {
        const { children, auth, authActions, languageActions, language } = this.props;
        return (
            <div className={styles.wrap}>
                <Header
                    auth={auth}
                    onLogout={this.onLogout}
                    toggleNav={this.toggleNav}
                    languageActions={languageActions}
                    language={language}
                    toggleFullPermission={authActions.toggleFullPermission}
                    stateGo={this.stateGo}
                />
                <div className={styles.main}>{children}</div>
            </div>
        );
    }
}

MainLayout.propTypes = {
    children: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    languageActions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { auth, language } = state;
    return {
        auth,
        language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(actions.authActions, dispatch),
        languageActions: bindActionCreators(actions.languageActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
