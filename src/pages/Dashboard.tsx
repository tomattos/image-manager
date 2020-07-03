import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { createImage, fetchImages, removeImage, updateImage } from '../store/images/thunks';
import { selectAllImages } from '../store/images/selectors';
import ImageCard from '../components/ImageCard';
import { Image } from '../types/image';
import Tooltip from '../components/Tooltip';
import ImageForm from '../components/ImageForm';
import { ImageEntity } from '../entities/image';

export function Dashboard() {
  const dispatch = useDispatch();
  const images: Image[] = useSelector(selectAllImages);
  const [formImage, setFormImage] = useState(new ImageEntity());
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchImages());
  }, [])

  function handleImageClick(image: Image) {
    setFormImage(image);
    setOpenModal(true);
  }

  function handleImageRemove(id: string) {
    dispatch(removeImage(id));
  }

  function handleCreateImage() {
    setFormImage(new ImageEntity());
    setOpenModal(true);
  }

  function handleSubmit(payload: Image): void {
    dispatch(payload.id ? updateImage(payload) : createImage(payload));
  }

  function handleCloseModal(): void {
    setOpenModal(false);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <IconButton
          color="primary"
          onClick={handleCreateImage}
        >
          <AddCircle fontSize="large" />
        </IconButton>
      </Grid>

      {images.length
        ? images.map((image: Image) => (
          <Grid item md={4} sm={6} xs={12} key={image.id}>
              <ImageCard
                handleImageRemove={handleImageRemove}
                handleImageClick={handleImageClick}
                renderTooltip={((tooltip) => <Tooltip {...tooltip} /> )}
                {...image}
              />
          </Grid>
        ))
        : <Typography variant="h3">Empty box</Typography>
      }

      <ImageForm
        open={openModal}
        initialFormState={formImage}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />
    </Grid>
  )
}
