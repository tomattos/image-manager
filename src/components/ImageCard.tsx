import React, { CSSProperties, ReactNode, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Tooltip } from '../types/tooltip';
import { Image } from '../types/image';

type Props = {
  readonly id?: string;
  readonly name: string;
  readonly tooltip: Tooltip;
  readonly src: string;
  handleImageClick: (image: Image) => void;
  handleImageRemove: (id: string) => void;
  renderTooltip: (tooltip: Tooltip) => ReactNode;
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: '6px',
    cursor: 'pointer'
  },
  image: {
    height: '200px',
    objectFit: 'cover'
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2)
  }
}));

export default function ImageCard({
  id,
  name,
  src,
  tooltip,
  renderTooltip,
  handleImageClick,
  handleImageRemove
}: Props) {
  const classes = useStyles();
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipAnimation: CSSProperties = {
    visibility: showTooltip ? 'visible' : 'hidden',
    opacity: Number(showTooltip)
  }

  return (
    <div
      className={classes.root}
      onClick={() => handleImageClick({ name, src, tooltip, id })}
    >
      {/* image */}
      <img
        src={src}
        alt={name}
        width="100%"
        className={classes.image}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />

      {/* name */}
      <div className={classes.info}>
        {name}
        <Button color="secondary" onClick={(e) => {
          e.stopPropagation()
          handleImageRemove(id as string)
        }}>Remove</Button>
      </div>

      {/* render tooltip (or any other component with tooltip info) */}
      <div style={tooltipAnimation}>
        {renderTooltip(tooltip)}
      </div>
    </div>
  )
}
