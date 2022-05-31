/*eslint-disable*/
import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import styles from 'assets/jss/material-dashboard-react/components/footerStyle.js';

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{' '}
          <a
            href="https://pt.wikipedia.org/wiki/Direito_autoral"
            target="_blank"
            className={classes.a}
          >
            Todos os direitos reservados
          </a>
          , desenvolvido por Claudio Marcos
        </p>
      </div>
    </footer>
  );
}
