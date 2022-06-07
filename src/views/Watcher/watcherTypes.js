export const FETCH_WATCHERS_REQUEST = 'FETCH_WATCHERS_REQUEST';
export const FETCH_WATCHERS_SUCCESS = 'FETCH_WATCHERS_SUCCESS';
export const FETCH_WATCHERS_FAILURE = 'FETCH_WATCHERS_FAILURE';

export const CURRENT_WATCHER = 'CURRENT_WATCHER';

export const ADD_WATCHER_REQUEST = 'ADD_WATCHER_REQUEST';
export const ADD_WATCHER_SUCCESS = 'ADD_WATCHER_SUCCESS';
export const ADD_WATCHER_FAILURE = 'ADD_WATCHER_FAILURE';

export const EDIT_WATCHER_REQUEST = 'EDIT_WATCHER_REQUEST';
export const EDIT_WATCHER_SUCCESS = 'EDIT_WATCHER_SUCCESS';
export const EDIT_WATCHER_FAILURE = 'EDIT_WATCHER_FAILURE';

export const ADD_WATCHER_AVATAR_REQUEST = 'ADD_WATCHER_AVATAR_REQUEST';
export const ADD_WATCHER_AVATAR_SUCCESS = 'ADD_WATCHER_AVATAR_SUCCESS';
export const ADD_WATCHER_AVATAR_FAILURE = 'ADD_WATCHER_AVATAR_FAILURE';

export const FETCH_NEW_WATCHER = 'FETCH_NEW_WATCHER';

export const WATCHER_OBJ = {
  situacao: 'ativo',
  matricula: '',
  nome: '',
  telefone: '',
  funcao: '',
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
      cep: ''
    },
    avatar_url: '',
    avatar_nome: ''
  }
};
