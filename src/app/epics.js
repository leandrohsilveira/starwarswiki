import { combineEpics } from 'redux-observable';
import layoutEpics from './layout/epics';
import filmsEpics from './films/epics';

const epics = combineEpics(layoutEpics, filmsEpics);

export default epics;
