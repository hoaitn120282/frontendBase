import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

class DashboardComponent extends PureComponent {
    render() {
        return (
            <Fragment>
                <div>
                    <h1>Dashboard</h1>
                </div>
            </Fragment>
        );
    }
}

DashboardComponent.propTypes = {
    auth: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired
};
export default DashboardComponent;
