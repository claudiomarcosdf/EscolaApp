import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

import _ from 'lodash';
import ImageUpload from '../../components/ImageUploader/ImageUpload';
import { addStudentAvatar } from '../../views/Student/studentActions';

export default function StudentProfileAvatar(props) {
  const { onClose } = props;

  const [avatar, setAvatar] = useState({});
  const { _id } = useSelector((state) => state.student.student);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isEmpty(avatar)) {
      let formData = new FormData();
      formData.append('file', avatar[0]);

      dispatch(addStudentAvatar(_id, 'avatar', formData));
    }
  }, [avatar, _id, dispatch]);

  const handleModalClose = () => {
    onClose(null);
  };

  const onDrop = (picture) => {
    setAvatar(picture);
  };

  return (
    <div>
      <ImageUpload
        {...props}
        onChange={onDrop}
        title="Foto do perfil"
        labelButton="Selecione sua foto"
        imageSize={2097152}
      />
      <div style={styles.flex}>
        <Button color="primary" onClick={handleModalClose}>
          Sair
        </Button>
      </div>
    </div>
  );
}

const styles = {
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'right',
    justifyContent: 'end',
    marginBottom: '0px'
  }
};
