import { combineEpics } from 'redux-observable';
import onSubmitTask from './onSubmitTask';
import onCompleteTask from './onCompleteTask';

const tasksEpics = combineEpics(onSubmitTask, onCompleteTask);

export default tasksEpics;
