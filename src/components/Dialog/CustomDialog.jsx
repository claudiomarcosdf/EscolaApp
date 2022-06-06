import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    left: 400,
    top: 50
  }
});

export default function CustomDialog({
  onClose,
  onConfirm,
  open,
  title,
  message,
  position
}) {
  const handleClose = () => {
    onClose(null);
  };

  const handleConfirm = () => {
    onConfirm(null);
  };

  const classes = useStyles();

  return (
    <div>
      {console.log(position)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={position ? { paper: classes.dialog } : ''}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Não
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
