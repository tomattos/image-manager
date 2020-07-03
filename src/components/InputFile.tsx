import React, { ChangeEvent, HTMLAttributes } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void,
  imageName?: string,
  accept: string
} & HTMLAttributes<HTMLInputElement>

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px'
  },
  container: {
    position: 'relative',
    marginRight: '20px'
  },
  btn: {
    position: 'relative',
    zIndex: 1
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    height: '100%',
    opacity: 0
  }
}))

export function InputFile({ accept, imageName, handleFileChange, ...props }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Button className={classes.btn} variant="contained" color="primary">Add image</Button>
        <input
          accept={accept}
          className={classes.input}
          type="file"
          onChange={handleFileChange}
          {...props}
        />
      </div>

      { imageName || 'Empty' }
    </div>
  )
}
