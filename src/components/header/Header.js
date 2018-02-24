import React, { Component } from 'react';
import PropTypes from 'prop-types';
import screenfull from 'screenfull';
import { Link } from 'react-router-dom';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

import { Translate } from 'components/utils';
// import { actions } from 'redux-utils';
// icons
import FontAwesome from 'components/Icon/FontAwesome';
import SquareLogo from 'assets/images/logo-square.png';
import { generateImageUrl } from 'helpers/Common';
import styles from './style.scss';

class HeaderComponent extends Component {
    renderTotal = total => {
        if (total <= 0) {
            return '';
        } else if (total > 0 && total <= 99) {
            return total;
        } else {
            return '99+';
        }
    };
    render() {
        const { toggleNav, onLogout, auth: { userInfo } } = this.props;

        const fullName = userInfo.fullName;

        const avatar = userInfo.accountAvatar ? generateImageUrl(userInfo.accountAvatar) : SquareLogo;

        const context = this.context;

        return (
            <header className="site-head d-flex align-items-center justify-content-between">
                <div className="wrap mr-4 click-toggle-nav">
                    <FontAwesome
                        name="bars"
                        size="24"
                        color={context.get('primaryColor')}
                        onClick={toggleNav}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <div className="right-elems ml-auto d-flex">
                    <div className="wrap hidden-sm-down">
                        <FontAwesome name="arrows-alt" size="22" color="#111111" onClick={() => screenfull.toggle()} />
                    </div>
                    <div className="wrap notify hidden-sm-down">
                        <UncontrolledDropdown>
                            <DropdownToggle tag="div">
                                <FontAwesome name="bell" size="22" color="#1e2531" />
                            </DropdownToggle>

                            <DropdownMenu right className={styles.wrapNotify}>
                                <div className={styles.notifyHeaderStyle}>
                                    <span className="font-weight-bold">
                                        <Translate text="notifications" />
                                    </span>
                                    <span className="flex" />
                                    <Link to="/">
                                        <Translate text="seeAll" />
                                    </Link>
                                </div>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>

                    <div className="wrap profile">
                        <UncontrolledDropdown>
                            <DropdownToggle tag="div">
                                <div
                                    className={styles.avatarAccount}
                                    style={{
                                        backgroundImage: `url(${avatar})`
                                    }}
                                />
                            </DropdownToggle>
                            <DropdownMenu right style={{ minWidth: '12rem' }}>
                                <DropdownItem>{fullName}</DropdownItem>

                                <DropdownItem divider />
                                <div className="text-right ml-3 mr-3 mt-2">
                                    <Button onClick={onLogout} block color="success" size="sm">
                                        <FontAwesome name="power-off" size="15" />&emsp;<Translate text="logout" />
                                    </Button>
                                </div>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>
            </header>
        );
    }
}

HeaderComponent.defaultProps = {
    toggleNav: () => null,
    onLogout: () => null
};

HeaderComponent.propTypes = {
    toggleNav: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

HeaderComponent.contextTypes = {
    data: PropTypes.object,
    get: PropTypes.func,
    register: PropTypes.func
};

export default HeaderComponent;
