import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import moment from 'moment';
import * as format from '../../../helpers/formatHelpers';
import { addOccurrence } from '../../../views/Occurrence/occurrenceActions';
import { fetchMeasures } from '../../../views/TableList/tableListActions';

export default function RegisterOccurrence({ onClose }) {
  const nowDate = moment().format('YYYY-MM-DD');

  const newOccurrence = {
    data: nowDate,
    fato_observado: '',
    conduta: '',
    medida: '',
    valor: 0,
  };

  const student = useSelector((state) => state.student.student);
  const tableMeasures = useSelector((state) => state.table.tableMeasures);
  const dispatch = useDispatch();

  const [occurrence, setOccurrence] = useState(newOccurrence);
  const [currentMeasures, setCurrentMeasures] = useState([]);

  const getMeasures = useCallback(() => {
    dispatch(fetchMeasures());
  }, [dispatch]);

  useEffect(() => {
    getMeasures();
  }, []);

  const handleModalClose = () => {
    onClose(true);
  };

  const handleChangeValue = (event) => {
    const { name, value } = event.target;

    if (name === 'medida') {
      const selectedMedida = tableMeasures.find(
        (med) => med.descricao === value
      );
      setOccurrence({
        ...occurrence,
        medida: selectedMedida.descricao,
        valor: selectedMedida.valor,
      });
    } else {
      setOccurrence({ ...occurrence, [name]: value });
    }
  };

  const handleChangeCondutaValue = (event) => {
    const { name, value } = event.target;
    setOccurrence({ ...occurrence, [name]: value });

    let filteredMedidas = [];

    if (value === 'NEGATIVA') {
      filteredMedidas = tableMeasures.filter(
        (med) => med.tipo_conduta === 'NEGATIVA'
      );
    } else if (value === 'POSITIVA') {
      filteredMedidas = tableMeasures.filter(
        (med) => med.tipo_conduta === 'POSITIVA'
      );
    } else {
      filteredMedidas = tableMeasures.filter(
        (med) => med.tipo_conduta === 'NEUTRA'
      );
    }

    setCurrentMeasures(filteredMedidas);
  };

  const handleModalSave = () => {
    dispatch(addOccurrence(student._id, occurrence)); //Current Student
  };

  const classes = useStyles();
  return (
    <div>
      <div style={styles.flexRow}>
        <Typography variant="h5">Lançamento de ocorrência</Typography>
      </div>

      <form
        className={classes.root}
        onSubmit={(event) => event.preventDefault()}
      >
        <div className={classes.formatLayout}>
          <div className={classes.twoElements}>
            <TextField
              required
              name="data"
              id="data"
              label="Data do fato"
              type="date"
              // defaultValue={nowDate}
              value={format.formatDateToField(occurrence.data)}
              onChange={handleChangeValue}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <TextField
              required
              className={classes.spaceTop}
              name="fato_observado"
              id="fato_observado"
              label="Fato observado"
              fullWidth
              value={occurrence.fato_observado}
              onChange={handleChangeValue}
            />{' '}
          </div>
          <div className={`${classes.twoElements} ${classes.spaceTop}`}>
            <FormControl className={classes.formControlConduta}>
              <InputLabel id="select-label">Conduta</InputLabel>
              <Select
                required
                labelId="select-label"
                id="conduta"
                name="conduta"
                value={occurrence.conduta}
                onChange={handleChangeCondutaValue}
                style={
                  occurrence.conduta === 'NEGATIVA'
                    ? styles.badColor
                    : styles.greatColor
                }
              >
                {condutas.map((conduta, index) => {
                  return (
                    <MenuItem value={conduta} key={index}>
                      {conduta}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className={`${classes.twoElements} ${classes.spaceTop}`}>
            <FormControl className={classes.formControlMedida}>
              <InputLabel id="select-label">Medida</InputLabel>
              <Select
                required
                labelId="select-label"
                id="medida"
                name="medida"
                value={occurrence.medida}
                onChange={handleChangeValue}
                disabled={currentMeasures.length === 0}
              >
                {currentMeasures.map((opc, index) => {
                  return (
                    <MenuItem value={opc.descricao} key={index}>
                      {opc.descricao}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              required
              name="valor"
              id="valor"
              label="Valor"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10, step: 0.01 } }}
              value={occurrence.valor}
              onChange={handleChangeValue}
            />
          </div>
        </div>

        <div style={styles.flexFooter} className={classes.formatLayout}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleModalSave}
            disabled={
              !(
                occurrence.fato_observado.length > 0 &&
                occurrence.conduta.length > 0 &&
                occurrence.medida.length > 0
              )
            }
          >
            Salvar
          </Button>
          <Button color="primary" onClick={handleModalClose}>
            Sair
          </Button>
        </div>
      </form>
    </div>
  );
}

const condutas = ['NEGATIVA', 'POSITIVA', 'NEUTRA'];

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'right',
    justifyContent: 'space-between',
    marginBottom: '0px',
  },
  flexFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'right',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  greatColor: {
    color: '#079992',
  },
  badColor: {
    color: '#eb3b5a',
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  formatLayout: {
    margin: theme.spacing(1),
    marginTop: '60px',
  },
  twoElements: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  spaceTop: {
    marginTop: '20px',
  },
  formControlConduta: {
    width: '41ch',
  },
  formControlMedida: {
    width: '41ch',
    marginRight: '20px',
  },
}));
