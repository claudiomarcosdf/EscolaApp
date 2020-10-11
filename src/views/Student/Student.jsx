import React from 'react';
import { toastr } from 'react-redux-toastr';

import { useSelector } from 'react-redux';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import FindStudent from '../../components/FindStudent/FindStudent';
import StudentDashboard from '../../components/StudentDasboard/StudentDasboard';
// import GlobalMessages from 'components/GlobalMessages/GlobalMessages';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const student = useSelector((state) => state.student);
  //const dispatch = useDispatch();
  const classes = useStyles();

  return student.loading ? (
    <>
      <h2>Carregando...</h2>
    </>
  ) : (
    <>
      <FindStudent />

      {student.student && <StudentDashboard />}

      {/* {student.errors &&
        student.errors.forEach((error) => toastr.error('Erro', error))} */}
    </>
  );
}
