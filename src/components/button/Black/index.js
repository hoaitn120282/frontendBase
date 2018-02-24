import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button } from 'reactstrap';

import styles from './style.scss';

class BlackButton extends Component {
    render() {
        const { children, className } = this.props;
        const props = _.omit(this.props, ['className', 'children']);

        return (
            <Button {...props} className={`${styles.button} ${className}`}>
                {children}
            </Button>
        );
    }
}

BlackButton.defaultProps = {
    className: ''
};

BlackButton.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export default BlackButton;
