import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

class AccountComponent extends PureComponent {
    render() {
        return (
            <Fragment>
                <div>Account Page</div>
            </Fragment>
        );
    }
}

AccountComponent.propTypes = {
    auth: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired
};
export default AccountComponent;
