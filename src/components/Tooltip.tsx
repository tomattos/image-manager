import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Placement, Tooltip as ITooltip } from '../types/tooltip';
import { makeStyles } from '@material-ui/core/styles';

type Props = {} & ITooltip

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    zIndex: 2
  }
}))

export default function Tooltip({ name, placement, color }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const [mainPlacementValue, setMainPlacementValue] = useState(0)
  const [secondaryPlacementValue, setSecondaryPlacementValue] = useState(0)

  const styles = {
    position: 'absolute',
    height: 'auto',
    padding: '10px',
    border: '1px solid gray',
    borderRadius: '5px',
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    color,
    [placement]: -mainPlacementValue,
    [checkIfMainAxisX(placement) ? 'top' : 'left']: `calc(50% - ${secondaryPlacementValue/2}px)`
  } as CSSProperties

  useEffect(() => {
    const width = (ref && ref.current) ? ref.current.offsetWidth : 0;
    const height = (ref && ref.current) ? ref.current.offsetHeight : 0;

    checkIfMainAxisX(placement)
      ? definePositioning(width+10, height)
      : definePositioning(height+10, width)
  }, [ref.current, placement]);

  function checkIfMainAxisX(placement: Placement): boolean {
    return  (placement !== 'top' && placement !== 'bottom');
  }

  function definePositioning(main: number, secondary: number) {
    setMainPlacementValue(main);
    setSecondaryPlacementValue(secondary);
  }

  return (
    <div
      ref={ref}
      className={classes.root}
      style={styles}
    >
      {name}
    </div>
  )
}
