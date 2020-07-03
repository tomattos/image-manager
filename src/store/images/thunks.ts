import { createAsyncThunk } from '@reduxjs/toolkit';
import * as imageApi from '../../api/imageApi';
import { actions } from './slice';
import { Image } from '../../types/image';

export const createImage = createAsyncThunk(
  'image/createImage',
  async (payload: Image, { dispatch }) => {
    const image: Image = await imageApi.createImage(payload);
    const storageData = localStorage.getItem('images');
    const images = storageData ? JSON.parse(storageData) : [];

    localStorage.setItem('images', JSON.stringify([...images, image]));

    dispatch(actions.imageReceived(image));
  }
);

export const fetchImages = createAsyncThunk(
  'image/fetchImages',
  async (payload, { dispatch }) => {
    const images: Image[] = await imageApi.fetchImages();

    dispatch(actions.imagesReceived(images));
  }
)

export const updateImage = createAsyncThunk(
  'image/updateImage',
  async (payload: Image, { dispatch }) => {
    const image: Image = await imageApi.updateImage(payload);

    dispatch(actions.imageUpdated(image));
  }
)

export const removeImage = createAsyncThunk(
  'image/removeImage',
  async (payload: string, { dispatch }) => {
    const removedId = await imageApi.removeImage(payload);

    dispatch(actions.imageRemoved(removedId));
  }
)
