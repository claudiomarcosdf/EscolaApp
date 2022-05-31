import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

CpfMask.propTypes = {
  inputRef: PropTypes.func.isRequired
};

export default function CpfMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      //prettier-ignore
      mask={[/\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}
