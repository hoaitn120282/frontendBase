import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

class EmptyLayout extends PureComponent {
    render() {
        const { children } = this.props;
        return <Fragment>{children}</Fragment>;
    }
}

EmptyLayout.propTypes = {
    children: PropTypes.any.isRequired
};

export default EmptyLayout;
