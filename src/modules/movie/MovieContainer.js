import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions } from 'redux-utils';
import MovieComponent from './MovieComponent';
class MovieContainer extends PureComponent {
    componentWillMount() {
        const { movieActions } = this.props;
        movieActions.getMovie('batman');
    }
    render() {
        const { movie } = this.props;
        return <MovieComponent movie={movie} />;
    }
}

MovieContainer.propTypes = {
    movie: PropTypes.object.isRequired,
    movieActions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const { movie } = state;
    return {
        movie
    };
};

const mapDispatchToProps = dispatch => {
    return {
        movieActions: bindActionCreators(actions.movieActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);
