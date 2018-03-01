import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions } from 'redux-utils';

class MovieContainer extends PureComponent {
    componentWillMount() {
        const { movieActions } = this.props;
        movieActions.getMovie('batman');
    }
    render() {
        return <div />;
    }
}

MovieContainer.propTypes = {
    movieActions: PropTypes.object
};

const mapDispatchToProps = dispatch => {
    return {
        movieActions: bindActionCreators(actions.movieActions, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(MovieContainer);
