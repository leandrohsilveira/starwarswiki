import { combineEpics } from 'redux-observable';
import onLoadFilms from './onLoadFilms';
import onFetchFilmsPage from './onFetchFilmsPage';

const filmsEpics = combineEpics(onLoadFilms, onFetchFilmsPage);

export default filmsEpics;
