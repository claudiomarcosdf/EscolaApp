import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Progress({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.box}>
      <div>
        <CircularProgress size={30} />
      </div>
      <div style={{ marginLeft: '20px' }}>{children}</div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30px',
  },
}));
