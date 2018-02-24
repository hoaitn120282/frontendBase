import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import LogoImg from 'assets/images/logo.png';
import styles from './style.scss';

class NavHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: ''
        };
    }

    render() {
        return (
            <header className="nav-head">
                <NavLink to="/">
                    <div
                        className={styles.logoSidebar}
                        style={{
                            backgroundImage: `url(${LogoImg})`
                        }}
                    />
                </NavLink>
            </header>
        );
    }
}

const mapStateToProps = state => {
    const { agent, auth } = state;
    return {
        agent,
        auth
    };
};

export default connect(mapStateToProps)(NavHead);
