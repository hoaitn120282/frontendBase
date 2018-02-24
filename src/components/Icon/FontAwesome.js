import React from 'react';
import PropTypes from 'prop-types';

const FontIcon = ({ name, color, size, ...rest }) => {
    size = Number(size);
    const style = {
        color,
        fontSize: size,
        width: size,
        height: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
    return (
        <span style={{ display: 'inline-block' }} {...rest}>
            <i className={`fa fa-${name}`} style={style} />
        </span>
    );
};

FontIcon.defaultProps = {
    size: 16
};

FontIcon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default FontIcon;
