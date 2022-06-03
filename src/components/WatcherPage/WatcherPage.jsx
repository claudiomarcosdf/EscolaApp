import React from 'react';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

import WatcherForm from './WatcherForm/WatcherForm';
import WatcherList from './WatcherList/WatcherList';

function WatcherPage() {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={5}>
        <WatcherList></WatcherList>
      </GridItem>
      <GridItem xs={12} sm={12} md={7}>
        <WatcherForm></WatcherForm>
      </GridItem>
    </GridContainer>
  );
}

export default WatcherPage;
