import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @material-ui/core
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardFooter from 'components/Card/CardFooter.js';

import People from '@material-ui/icons/People';
import DateRange from '@material-ui/icons/DateRange';
import Forward10 from '@material-ui/icons/Forward10';
import Update from '@material-ui/icons/Update';
import { makeStyles } from '@material-ui/core/styles';

import Chart from './Chart';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import {
  fetchCountStudents,
  fetchResumeOccurrences
} from '../Dashboard/dashboardActions';
import Progress from '../../components/Progress/Progress';

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const totalStudents = useSelector((state) => state.dashboard.countStudents);
  const resumeOccurrences = useSelector(
    (state) => state.dashboard.resumeOccurrences
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCountStudents());
    dispatch(fetchResumeOccurrences());
  }, [dispatch]);

  return (
    <div>
      {!resumeOccurrences && <Progress>Carregando...</Progress>}
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <People />
              </CardIcon>
              <p className={classes.cardCategory}>Alunos</p>
              <h3 className={classes.cardTitle}>{totalStudents}</h3>
              <h4 className={classes.cardTitle}>&nbsp;</h4>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Total atualizado
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Forward10 />
              </CardIcon>
              <p className={classes.cardCategory}>Ocorrências</p>
              <h3 className={classes.cardTitle}>
                {resumeOccurrences.occurrencesPerDay} <small>hoje</small>
              </h3>
              <h4 className={classes.cardTitle}>
                {resumeOccurrences.occurrencesPerMonth} <small>no mês</small> |{' '}
                {resumeOccurrences.occurrencesPerYear} <small>no ano</small>
              </h4>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Ocorrências periódicas
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Chart />
        </GridItem>
      </GridContainer>
    </div>
  );
}
