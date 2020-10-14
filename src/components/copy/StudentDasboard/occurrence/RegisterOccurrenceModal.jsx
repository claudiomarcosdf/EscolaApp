import React from 'react';
import Modal2 from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//Modal2.setAppElement('#root');
Modal2.setAppElement('body');

export default function RegisterOccurrenceModal({ onClose, open }) {
  const handleModalClose = () => {
    onClose(true);
  };

  const classes = useStyles();
  return (
    <div>
      <Modal2 style={styles} isOpen={open}>
        <div style={styles.flexRow}>
          <Typography variant="h5">Lançamento de ocorrência</Typography>
        </div>

        <div className={classes.root}></div>
        <div style={styles.flexRow}>
          <Button color="primary">Salvar</Button>
          <Button color="primary" onClick={handleModalClose}>
            Sair
          </Button>
        </div>
      </Modal2>
    </div>
  );
}

const styles = {
  content: {
    width: '800px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
  },

  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'right',
    justifyContent: 'space-between',
    marginBottom: '0px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));
