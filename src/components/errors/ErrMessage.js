import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import _ from 'lodash';
class ErrMessage extends Component {
    render() {
        const { name, obj, label } = this.props;
        let text = obj[name] === undefined ? '' : obj[name];
        text = text.replace(name, label);
        return (
            <div>
                <p className=" mt-2 text-danger">
                    <small>
                        <em>{text}</em>
                    </small>
                </p>
            </div>
        );
    }
}

ErrMessage.propTypes = {
    name: PropTypes.string,
    obj: PropTypes.object,
    label: PropTypes.string
};

export default ErrMessage;
