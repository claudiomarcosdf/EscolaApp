import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

export default function GlobalMessages(props) {
  // const { errors } = props;

  return (
    <div>
      <ReduxToastr
        timeOut={5000}
        newestOnTop={false}
        preventDuplicates={true}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        removeOnHover={true}
        progressBar
        closeOnToastrClick
      />
    </div>
  );
}
