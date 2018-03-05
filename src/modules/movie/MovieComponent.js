import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class MovieComponent extends PureComponent {
    render() {
        const { movie: { movieData } } = this.props;
        return (
            <div>
                {movieData.map(({ show }) => (
                    <div key={show.id}>
                        <p>{show.name}</p>
                    </div>
                ))}
            </div>
        );
    }
}

MovieComponent.propTypes = {
    movie: PropTypes.object.isRequired
};

export default MovieComponent;
