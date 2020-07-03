import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { imageAdapter } from './state';
import { Image } from '../../types/image';

export const { reducer: imageReducer, actions } = createSlice({
  name: 'image',
  initialState: imageAdapter.getInitialState(),
  reducers: {
    imagesReceived(state, action: PayloadAction<Image[]>) {
      imageAdapter.setAll(state, action.payload);
    },
    imageReceived(state, action: PayloadAction<Image>) {
      imageAdapter.addOne(state, action.payload);
    },
    imageUpdated(state, action: PayloadAction<Image>) {
      imageAdapter.updateOne(state, {
        id: action.payload.id as string,
        changes: action.payload
      });
    },
    imageRemoved(state, action: PayloadAction<string>) {
      imageAdapter.removeOne(state, action.payload);
    }
  }
});
