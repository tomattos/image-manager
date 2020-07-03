import { combineReducers } from 'redux';
import { imageReducer } from './images/slice';

const rootReducer = combineReducers({
  images: imageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
