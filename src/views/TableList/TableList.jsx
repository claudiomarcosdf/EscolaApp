import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';

import {
  fetchMeasures,
  fetchBehaviors,
  fetchTransgressions,
} from './tableListActions';
import TableMeasure from './TableMeasure';
import TableBehavior from './TableBehavior';
import TableTransgression from './TableTransgression';

export default function TableList() {
  const dispatch = useDispatch();

  const getMeasures = useCallback(() => {
    dispatch(fetchMeasures());
  }, []);

  const getBehaviors = useCallback(() => {
    dispatch(fetchBehaviors());
  }, []);

  const getTransgressions = useCallback(() => {
    dispatch(fetchTransgressions());
  }, []);

  useEffect(() => {
    getMeasures();
    getBehaviors();
    getTransgressions();
  }, [getMeasures]);

  const classes = useStyles();
  return (
    <div>
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

const useStyles = makeStyles({
  content: {
    direction: 'row',
    justify: 'center',
    alignItems: 'center',
  },
});
