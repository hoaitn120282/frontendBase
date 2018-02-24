import { createBrowserHistory as createHistory } from 'history';
const history = createHistory({
    basename: '/',
    hashType: 'slash'
});

export default history;
export { history };
