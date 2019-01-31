import { combineEpics } from 'redux-observable';
import onSubmitTask from './onSubmitTask';

const tasksEpics = combineEpics(onSubmitTask);

export default tasksEpics;
