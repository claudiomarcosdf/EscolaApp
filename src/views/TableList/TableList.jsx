import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';

import {
  fetchMeasures,
  fetchBehaviors,
  fetchTransgressions
} from './tableListActions';
import TableMeasure from './TableMeasure';
import TableBehavior from './TableBehavior';
import TableTransgression from './TableTransgression';
import Progress from '../../components/Progress/Progress';

export default function TableList() {
  const tables = useSelector((state) => state.table);
  const dispatch = useDispatch();

  const getMeasures = useCallback(() => {
    dispatch(fetchMeasures());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getBehaviors = useCallback(() => {
    dispatch(fetchBehaviors());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getTransgressions = useCallback(() => {
    dispatch(fetchTransgressions());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getMeasures();
    getBehaviors();
    getTransgressions();
  }, [getMeasures]); // eslint-disable-line react-hooks/exhaustive-deps

  // const classes = useStyles();
  return (
    <div>
      {tables.loading && <Progress>Carregando...</Progress>}
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <TableMeasure />
        </GridItem>

        <GridItem xs={12} sm={6} md={6}>
          <TableBehavior />
        </GridItem>

        <GridItem xs={12} sm={12} md={12}>
          <TableTransgression />
        </GridItem>
      </GridContainer>
    </div>
  );
}

// const useStyles = makeStyles({
//   content: {
//     direction: 'row',
//     justify: 'center',
//     alignItems: 'center',
//   },
// });
