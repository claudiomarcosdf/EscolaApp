import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

export default function StudentPersonalData(props) {
  const dados_pessoais = props.dados_pessoais;

  const { cpf, rg, email } = dados_pessoais;
  const { endereco, cidade, uf, cep } = dados_pessoais.residencia;
  const {
    responsavel1,
    celular_resp1,
    responsavel2,
    celular_resp2,
  } = dados_pessoais.contatos;

  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} sm={12} md={12}>
        <div className={`${classes.containerStyle} ${classes.body}`}>
          <div className={classes.headAdjustLeft}>Cpf:</div>
          <div className={`${classes.dataStrong} ${classes.dataAdjust}`}>
            {cpf}
          </div>

          <div className={classes.headAdjust}>Rg:</div>
          <div className={`${classes.dataStrong} ${classes.dataAdjustMiddle}`}>
            {rg}
          </div>

          <div className={classes.headAdjust}>Email:</div>
          <div className={`${classes.dataStrong}`}>{email}</div>
        </div>

        {/* RESIDÊNCIA */}
        <div className={`${classes.divSubtitle}`}>
          <div className={`${classes.heading}`}>Residência</div>
        </div>

        <div className={`${classes.containerStyle} ${classes.body}`}>
          <div className={`${classes.headAdjustLeft}`}>Endereço:</div>
          <div className={`${classes.dataStrong} ${classes.dataAdjust}`}>
            {endereco}
          </div>
        </div>

        <div className={`${classes.containerStyle} ${classes.body}`}>
          <div className={classes.headAdjustLeft}>Cidade:</div>
          <div className={`${classes.dataStrong} ${classes.dataAdjust}`}>
            {cidade}
          </div>

          <div className={classes.headAdjust}>UF:</div>
          <div className={`${classes.dataStrong} ${classes.dataAdjustMiddle}`}>
            {uf}
          </div>

          <div className={classes.headAdjust}>Cep:</div>
          <div className={`${classes.dataStrong}`}>{cep}</div>
        </div>

        {/* CONTATOS */}
        <div className={`${classes.divSubtitle}`}>
          <div className={`${classes.heading}`}>Contatos</div>
        </div>

        <div className={`${classes.containerStyle} ${classes.body}`}>
          <div className={classes.headAdjustLeft}>Responsável 1:</div>
          <div className={`${classes.dataStrong} ${classes.dataAdjust}`}>
            {responsavel1}
          </div>

          <div className={classes.headAdjust}></div>
          <div
            className={`${classes.dataStrong} ${classes.dataAdjustMiddle}`}
          ></div>

          <div className={classes.headAdjust}>Telefone:</div>
          <div className={`${classes.dataStrong}`}>{celular_resp1}</div>
        </div>

        <div className={`${classes.containerStyle} ${classes.body}`}>
          <div className={classes.headAdjustLeft}>Responsável 2:</div>
          <div className={`${classes.dataStrong} ${classes.dataAdjust}`}>
            {responsavel2}
          </div>

          <div className={classes.headAdjust}></div>
          <div
            className={`${classes.dataStrong} ${classes.dataAdjustMiddle}`}
          ></div>

          <div className={classes.headAdjust}>Telefone:</div>
          <div className={`${classes.dataStrong}`}>{celular_resp2}</div>
        </div>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  body: {
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightRegular,
  },
  dataStrong: {
    fontWeight: 'bold',
  },
  headAdjustLeft: {
    width: '93px',
  },
  headAdjust: {
    width: '58px',
  },
  dataAdjust: {
    width: '150px',
  },
  dataAdjustMiddle: {
    width: '100px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
    fontStyle: 'italic',
    flexBasis: '33.33%',
    flexShrink: 0,
    color: '#487eb0',
  },
  divSubtitle: {
    marginTop: '20px',
    marginBottom: '8px',
  },
}));
