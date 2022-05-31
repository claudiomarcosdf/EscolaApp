import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import * as format from '../../helpers/formatHelpers';

export default function StudentClasse(props) {
  const { ano, serie, turma, turno, data_matricula } = props.classe;

  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} sm={12} md={12}>
        <div className={`${classes.containerStyle} ${classes.body}`}>
          <div className={classes.headDataAdjust}>Ano:</div>
          <div className={classes.dataAdjust}>
            {ano} - {serie}
          </div>
        </div>
        <div className={`${classes.containerStyle} ${classes.body}`}>
          <div className={classes.headDataAdjust}>Turma:</div>{' '}
          <div className={classes.dataAdjust}>{turma}</div>
        </div>
        <div className={`${classes.containerStyle} ${classes.body}`}>
          <div className={classes.headDataAdjust}>Turno:</div>{' '}
          <div className={classes.dataAdjust}>{turno} </div>
        </div>
        <div className={`${classes.containerStyle} ${classes.body}`}>
          <div className={classes.headDataAdjust}>Data de matrícula:</div>{' '}
          <div className={classes.dataAdjust}>
            {format.formatDateBr(data_matricula)}{' '}
          </div>
        </div>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  body: {
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightRegular
  },
  headDataAdjust: {
    width: '120px'
  },
  dataAdjust: {
    fontWeight: 'bold'
  }
}));
