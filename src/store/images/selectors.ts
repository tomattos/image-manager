import { RootState } from '../rootReducer';
import { imageAdapter } from './state';

export const {
  selectAll: selectAllImages
} = imageAdapter.getSelectors<RootState>((state) => state.images);
