import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Dialog,
  Button
} from '@material-ui/core';
import { Placement } from '../types/tooltip';
import { Image } from '../types/image';
import { ImageEntity } from '../entities/image';
import { makeStyles } from '@material-ui/core/styles';
import { InputFile } from './InputFile';

interface Props {
  readonly open: boolean;
  readonly initialFormState: Image;
  handleCloseModal: () => void;
  handleSubmit: (form: Image) => void;
}

const useStyles = makeStyles((theme) => ({
  form: {
    padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(3)
  }
}))

export default function ImageForm({
  open,
  initialFormState,
  handleCloseModal,
  handleSubmit
}: Props) {
  const classes = useStyles();

  const { src, name, tooltip, id } = initialFormState
  const [imageSrc, setImageSrc] = useState(src);
  const [imageName, setImageName] = useState(name);
  const [tooltipPosition, setTooltipPosition] = useState(tooltip.placement);
  const [tooltipName, setTooltipName] = useState(tooltip.name);
  const [tooltipColor, setTooltipPColor] = useState(tooltip.color);

  useEffect(() => {
    const { src, name, tooltip } = initialFormState;
    setImageName(name);
    setImageSrc(src);
    setTooltipPosition(tooltip.placement);
    setTooltipName(tooltip.name);
    setTooltipPColor(tooltip.color);
  }, [initialFormState])

  function handleInputChange(hook: Dispatch<SetStateAction<any>>) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
      hook(event.target.value);
    }
  }

  function handleFileChange({ target }: ChangeEvent<HTMLInputElement>) {
    if (target.files) {
      setImageName(target.files[0].name);

      const fr = new FileReader();
      fr.addEventListener('load', ({ target } ) => {
        target && setImageSrc(target.result as string)
      })
      fr.readAsDataURL(target.files[0]);
    }
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // initially form was define as new ImageEntity()
    // but by some reason JSON.parse cannot serialize class instance,
    // so now you can see object literal defining
    const form: Image = {
      id,
      name: imageName,
      src: imageSrc,
      tooltip: {
        name: tooltipName,
        color: tooltipColor,
        placement: tooltipPosition,
      }
    }

    handleSubmit(form);
    handleCloseModal();
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => handleCloseModal()}
    >
      <form className={classes.form} onSubmit={handleFormSubmit}>
        <div>
          <InputFile
            accept="image/png, image/jpeg"
            imageName={imageName}
            handleFileChange={handleFileChange}
          />
        </div>

        <TextField
          fullWidth
          variant="filled"
          id="text"
          label="Tooltip Text"
          className={classes.formControl}
          value={tooltipName}
          onChange={handleInputChange(setTooltipName)}
        />

        <TextField
          fullWidth
          variant="filled"
          id="color"
          label="Tooltip Color"
          className={classes.formControl}
          value={tooltipColor}
          onChange={handleInputChange(setTooltipPColor)}
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="position-label">Tooltip Position</InputLabel>
          <Select
            variant="filled"
            fullWidth
            labelId="position-label"
            id="position"
            value={tooltipPosition}
            onChange={handleInputChange(setTooltipPosition)}
          >
            {Object.values(Placement).map((placement) =>
              (<MenuItem key={placement} value={placement}>{placement}</MenuItem>)
            )}
          </Select>
        </FormControl>

        {/* form controls */}
        <Button variant="contained" type="submit">Save</Button>
      </form>
    </Dialog>
  )
}
