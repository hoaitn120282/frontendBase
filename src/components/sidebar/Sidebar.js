import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import _ from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// icons
import { actions } from 'redux-utils';
import { Translate } from 'components/utils';
import FontAwesome from 'components/Icon/FontAwesome';
import styles from './style.scss';
import NavHead from './NavHead';

const { SubMenu } = Menu;

class NavList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            openKeys: [''],
            selectedKeys: ['']
        };
        this.nav = {
            common: ['/dashboard'],
            admin: ['/language', '/translate', '/role']
        };
    }

    componentWillMount() {
        this.hasActive(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.hasActive(nextProps);
    }

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        const rootSubmenuKeys = Object.keys(this.nav);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    };
    handleClick = (index, e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    handleOpen = (index, e) => {
        e.stopPropagation();
    };

    checkActive = (data, props) => {
        const { location: { hash } } = props;
        return _.some(data || [], v => {
            return _.startsWith(hash, `#${v}`, 0);
        });
    };

    hasActive = props => {
        const { location: { hash } } = props;
        const { common, admin } = this.nav;
        const selectedKeys = _.filter([...common, ...admin], v => {
            return _.startsWith(hash, `#${v}`, 0);
        });
        this.setState({
            selectedKeys
        });

        if (this.checkActive(common, props)) {
            this.setState({
                openKeys: ['common']
            });
        }

        if (this.checkActive(admin, props)) {
            this.setState({
                openKeys: ['admin']
            });
        }
    };

    onChangeLanguage = lang => {
        const { languageActions } = this.props;
        languageActions.changeLanguage(lang);
    };

    toggleLanguage = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    render() {
        const { language: { languageData: { data } } } = this.props;
        const { selectedKeys, openKeys, dropdownOpen } = this.state;
        return (
            <div className={`d-flex flex-column`} style={{ height: 'calc(100% - 62px)' }}>
                <div style={{ height: 'calc(100% - 40px)' }}>
                    <Scrollbars className={styles.navListContainer} autoHide>
                        <Menu
                            mode="inline"
                            theme="dark"
                            onOpenChange={this.onOpenChange}
                            selectedKeys={selectedKeys}
                            openKeys={openKeys}
                            style={{ width: '100%' }}
                            className={styles.wrapList}
                        >
                            <SubMenu
                                key="common"
                                title={
                                    <a>
                                        <span>COMMON</span>
                                    </a>
                                }
                                className={styles.subMenu}
                            >
                                <Menu.Item key="/dashboard">
                                    <NavLink to="/dashboard" activeClassName="active">
                                        <FontAwesome name="dashboard" />
                                        <span className="name">
                                            <Translate text="dashboard" />
                                        </span>
                                    </NavLink>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Scrollbars>
                </div>
                <div className={`d-flex justify-content-center`} style={{ flexShrink: 0 }}>
                    <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggleLanguage} dropup>
                        <DropdownToggle caret>
                            <Translate text="language" />
                        </DropdownToggle>
                        <DropdownMenu>
                            {data.map(v => (
                                <DropdownItem onClick={() => this.onChangeLanguage(v.countryCode)} key={v.id}>
                                    {v.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
            </div>
        );
    }
}

NavList.propTypes = {
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    languageActions: PropTypes.object.isRequired
};

const NavComponent = ({ language, languageActions, location, auth, mini }) => {
    return (
        <nav className={`${styles.siteNav} ${mini ? styles.mini : ''}`}>
            <NavHead />
            <NavList location={location} language={language} languageActions={languageActions} auth={auth} />
        </nav>
    );
};

NavComponent.defaultProps = {
    auth: {},
    location: {}
};

NavComponent.propTypes = {
    mini: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    language: PropTypes.object.isRequired,
    languageActions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { language, auth, router: { location } } = state;
    return {
        language,
        location,
        auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        languageActions: bindActionCreators(actions.languageActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavComponent);
