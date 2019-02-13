import { combineEpics } from 'redux-observable';
import onLoadFilms from './onLoadFilms';
import onFetchFilmsPage from './onFetchFilmsPage';
import onFilmsPageFetched from './onFilmsPageFetched';

const filmsEpics = combineEpics(onLoadFilms, onFetchFilmsPage, onFilmsPageFetched);

export default filmsEpics;
