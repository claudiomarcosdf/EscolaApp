import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    left: 400,
    top: 50
  }
});

export default function SimpleDialog({
  onClose,
  open,
  title,
  message,
  position
}) {
  const handleClose = () => {
    onClose(null);
  };

  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={position ? { paper: classes.dialog } : ''}
      >
        <DialogTitle id="alert-dialog-title" disableTypography={true}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
