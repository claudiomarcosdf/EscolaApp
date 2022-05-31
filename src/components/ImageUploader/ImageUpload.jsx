import React from 'react';
import ImageUploader from 'react-images-upload';
import Typography from '@material-ui/core/Typography';

import { styles } from './imageUploadStyle';

export default function ImageUpload({
  onChange,
  title,
  labelButton,
  imageSize,
  props
}) {
  const megaBytes = imageSize.toString().substr(0, 1);

  const handleChange = (picture) => {
    onChange(picture);
  };

  const classes = styles();
  return (
    <>
      <Typography
        variant="h6"
        style={{
          marginTop: '2px',
          marginBottom: '2px',
          textAlign: 'center'
        }}
      >
        {title}
      </Typography>
      <div className={classes.boxColumn}>
        <div className={classes.box}>
          <ImageUploader
            {...props}
            withIcon={true}
            withPreview={true}
            label={`Tamanho máximo do arquivo: ${megaBytes}mb | tipos aceitos: JPG, PNG, GIF`}
            labelStyles={{ textAlign: 'center' }}
            buttonText={labelButton}
            fileSizeError="Tamanho do arquivo maior que o permitido"
            fileTypeError="é um tipo não suportado"
            onChange={handleChange}
            imgExtension={['.jpg', '.gif', '.png']}
            maxFileSize={imageSize}
            singleImage={true}
          />
        </div>
      </div>
    </>
  );
}
