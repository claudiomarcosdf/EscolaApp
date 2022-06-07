import React, { useState } from 'react';

import Container from '@material-ui/core/Container';
import Card from 'components/Card/Card';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import GeralDataForm from './GeralDataForm';
import PersonalDataForm from './PersonalDataForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function WatcherForm() {
  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const classes = useStyles();
  return (
    <Card>
      <Container>
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ marginTop: '13px', marginBottom: '30px' }}
          gutterBottom
        >
          Dados do Observador
        </Typography>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              indicatorColor="primary"
              textColor="inherit"
              aria-label="simple tabs example"
            >
              <Tab label="Dados gerais" {...a11yProps(0)} />
              <Tab label="Dados pessoais" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={tab} index={0}>
            <GeralDataForm handleNextPage={handleChangeTab} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <PersonalDataForm />
          </TabPanel>
        </div>
      </Container>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2)
    },
    '& .MuiAppBar-colorPrimary': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent'
    }
  }
}));

export default WatcherForm;
