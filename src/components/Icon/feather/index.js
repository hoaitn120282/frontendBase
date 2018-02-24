import { icons } from 'feather-icons';
import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, ...rest }) => {
    const icon = icons[name].toSvg(rest);
    return <span dangerouslySetInnerHTML={{ __html: icon }} />;
};

Icon.propTypes = {
    name: PropTypes.string
};

export default Icon;
