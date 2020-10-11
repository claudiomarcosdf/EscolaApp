import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import User from '@material-ui/icons/AccountCircle';

import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  return (
    <div>
      <User />
    </div>
  );
}
