# Examples

Chúng ta sẽ sử dụng `https://api.tvmaze.com` để tạo trang lấy danh sách phim theo tên

### B1: Tạo thư mục `movie` trong thư mục `redux-utils`

![Movie redux folder](https://raw.githubusercontent.com/hoaitn120282/frontendBase/develop/docs/assets/movie-redux.png)

`actions.js`: Định nghĩa các action của redux được sử dụng trong **bindActionCreators**

```js
// redux-utils/movie/actions.js
import * as Types from './constants';

export const getMovie = name => ({
    type: Types.MOVIE_FETCH_MOVIE,
    name,
    meta: {
        thunk: true
    }
});
```

`constants.js`: Định nghĩa các type trạng thái của ứng dụng (Lưu ý nên đặt tên có prefix của redux module)

```js
// redux-utils/movie/constants.js
export const MOVIE_FETCH_MOVIE = 'MOVIE_FETCH_MOVIE';
export const MOVIE_FETCH_MOVIE_SUCCESS = 'MOVIE_FETCH_MOVIE_SUCCESS';
export const MOVIE_FETCH_MOVIE_ERROR = 'MOVIE_FETCH_MOVIE_ERROR';
```

`index.js`: Xuất ra các đối tượng phục vụ cho redux

```js
// redux-utils/movie/index.js
import movie from './reducer';
import * as movieActions from './actions';
import movieSagas from './sagas';

export { movie, movieActions, movieSagas };
```

`reducer.js`: Xử lý reducer cho redux

```js
// redux-utils/movie/reducer.js
import * as Types from './constants';

const initState = {
    movieData: []
};
export default (state = initState, action) => {
    switch (action.type) {
        case Types.MOVIE_FETCH_MOVIE_SUCCESS:
            return { ...state, movieData: action.payload };
        default:
            return state;
    }
};
```

`sagas`: Chứa các `function` xử lý của redux

```js
// redux-utils/movie/sagas/get-movie.js
import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import * as Types from './../constants';

const getMovie = name => {
    return axios.get(`https://api.tvmaze.com/search/shows?q=${name}`);
};

export default function*({ name, options, meta }) {
    try {
        const res = yield call(getMovie, name, options);
        yield put({
            type: Types.MOVIE_FETCH_MOVIE_SUCCESS,
            payload: res.data,
            meta
        });
    } catch (error) {
        yield put({
            type: Types.MOVIE_FETCH_MOVIE_ERROR,
            error: true,
            payload: error,
            meta
        });
    }
}
```

```js
// redux-utils/movie/sagas/index.js
import { takeLatest, fork } from 'redux-saga/effects';
import getMovie from './get-movie';
import * as Types from './../constants';

export default function* rootSaga() {
    yield fork(takeLatest, Types.MOVIE_FETCH_MOVIE, getMovie);
}
```

Ý nghĩa:

> Lưu ý: Mỗi `redux module` cần xuất ra 3 đối tượng đó là **reducer**, **Action** và cuối cùng là **sagas**

### B2: Tạo thư mục `movie` trong thư mục `modules` và các tập tin tương ứng

![Movie module folder](https://raw.githubusercontent.com/hoaitn120282/frontendBase/develop/docs/assets/movie-module.png)

```javascript
// modules/modue/MovieContainer.js

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
```

```javascript
// modules/movie/MovieComponent.js

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
```

### B3: Tạo route

```js
// src/routes/appRoutes.js
import { EmptyLayout, AuthLayout, AdminLayout } from 'components/layout';
...

import MovieContainer from 'modules/movie/MovieContainer';

...
    <Switch>
        ...
        <PrivateRouteLayout layout={AuthLayout} path="/movie" component={MovieContainer} />
        ...
    </Switch>
```
