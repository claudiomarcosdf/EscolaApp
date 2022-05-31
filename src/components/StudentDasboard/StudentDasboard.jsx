import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GridItem from '../Grid/GridItem';
import GridContainer from '../Grid/GridContainer';

import _ from 'lodash';

import StudentProfile from './StudentProfile';
import StudentClasse from './StudentClasse';
import StudentPersonalData from './StudentPersonalData';
import StudentOccurrences from './StudentOccurrences';

export default function StudentDasboard() {
  const studentState = useSelector((state) => state.student);
  const classes = useStyles();

  const student = studentState.student;

  return (
    <>
      {!_.isEmpty(student._id) && (
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <div className={classes.root}>
              {/* <Accordion CLASSE> */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Classe</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Série e turma
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <StudentClasse classe={student.classe} />
                </AccordionDetails>
              </Accordion>
              {/* <Accordion DADOS PESSOAIS> */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>
                    Dados pessoais
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {student.dados_pessoais ? (
                    <StudentPersonalData
                      dados_pessoais={student.dados_pessoais}
                    />
                  ) : (
                    <Typography
                      variant="inherit"
                      style={{ fontSize: '0.9rem' }}
                    >
                      Sem informações pessoais
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
              {/* <Accordion OCORRÊNCIAS> */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className={classes.heading}>
                    Ocorrências
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {student.ocorrencias ? (
                    <StudentOccurrences ocorrencias={student.ocorrencias} />
                  ) : (
                    <Typography
                      variant="inherit"
                      style={{ fontSize: '0.9rem' }}
                    >
                      Não há ocorrências
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </div>
          </GridItem>
          {/* CARD PROFILE */}
          <GridItem xs={12} sm={12} md={4}>
            {student.comportamento && <StudentProfile student={student} />}
          </GridItem>
        </GridContainer>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '30px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: '#487eb0',
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));
