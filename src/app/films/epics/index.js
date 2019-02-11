import { combineEpics } from 'redux-observable';
import onLoadFilms from './onLoadFilms';

const filmsEpics = combineEpics(onLoadFilms);

export default filmsEpics;
