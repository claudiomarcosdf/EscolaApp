import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import ChartistGraph from 'react-chartist';
import AccessTime from '@material-ui/icons/AccessTime';

import { makeStyles } from '@material-ui/core/styles';

import { emailsSubscriptionChart } from 'dataChart/charts';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { fetchResumeBehaviors } from '../Dashboard/dashboardActions';

const useStyles = makeStyles(styles);

export default function Chart() {
  const resumeBehaviors = useSelector(
    (state) => state.dashboard.resumeBehaviors
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchResumeBehaviors());
  }, [dispatch]);

  const {
    totalExcepcional,
    totalOtimo,
    totalBom,
    totalRegular,
    totalInsuficiente,
    totalMau
  } = resumeBehaviors;

  const data = {
    labels: ['Excepcional', 'Ótimo', 'Bom', 'Regular', 'Insuficiente', 'Mau'],
    series: [
      [
        totalExcepcional,
        totalOtimo,
        totalBom,
        totalRegular,
        totalInsuficiente,
        totalMau
      ]
    ]
  };

  const classes = useStyles();
  return (
    <div>
      {' '}
      <Card chart>
        <CardHeader color="warning">
          <ChartistGraph
            className="ct-chart"
            data={data}
            type="Bar"
            options={emailsSubscriptionChart.options}
            responsiveOptions={emailsSubscriptionChart.responsiveOptions}
            listener={emailsSubscriptionChart.animation}
          />
        </CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>Comportamento dos alunos</h4>
          <p className={classes.cardCategory}>
            Quantidade de alunos por classificação do comportamento
          </p>
        </CardBody>
        <CardFooter chart>
          <div className={classes.stats}>
            <AccessTime /> comportamentos atualizados
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
