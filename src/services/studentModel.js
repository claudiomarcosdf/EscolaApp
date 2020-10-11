import moment from 'moment';
const nowDate = moment().format('YYYY-MM-DD');

const studentModel = {
  situacao: 'ativo',
  matricula: '',
  nome: '',
  telefone: '',
  patente: '',
  data_nascimento: '',
  genero: '',
  dados_pessoais: {
    cpf: '',
    rg: '',
    email: '',
    residencia: {
      endereco: '',
      cidade: '',
      uf: '',
      cep: '',
    },
    contatos: {
      responsavel1: '',
      celular_resp1: '',
      responsavel2: '',
      celular_resp2: '',
    },
  },
  classe: {
    data_matricula: nowDate,
    ano: '',
    turma: '',
    turno: '',
    serie: '',
  },
};

export default studentModel;
