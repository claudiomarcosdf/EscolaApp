import React from 'react';
import { useSelector } from 'react-redux';
// @material-ui/core components
import FindStudent from '../../components/FindStudent/FindStudent';
import StudentDashboard from '../../components/StudentDasboard/StudentDasboard';
// import GlobalMessages from 'components/GlobalMessages/GlobalMessages';

export default function UserProfile() {
  const student = useSelector((state) => state.student);
  //const dispatch = useDispatch();

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
