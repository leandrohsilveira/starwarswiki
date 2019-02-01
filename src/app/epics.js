import { combineEpics } from 'redux-observable';
import layoutEpics from './layout/epics';
import filmsEpics from './films/epics';
import tasksEpics from './tasks/epics';

const epics = combineEpics(layoutEpics, filmsEpics, tasksEpics);

export default epics;
