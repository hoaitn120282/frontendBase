import React from 'react';
import PropTypes from 'prop-types';

const SwitchComponent = ({ source, dest, className = '', children, ...rest }) => {
    const classN = source === dest ? 'active step-in' : '';
    return (
        <div {...rest} className={`${classN} ${className} step-fade step-item`}>
            {children}
        </div>
    );
};

SwitchComponent.propTypes = {
    source: PropTypes.any,
    dest: PropTypes.any,
    children: PropTypes.any.isRequired,
    className: PropTypes.string
};

export default SwitchComponent;
