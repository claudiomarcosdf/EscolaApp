function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatNumber(value) {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function formatDateBr(date) {
  if (!date) {
    return;
  }

  const dateToFormat = date.substring(0, 10);
  const currentDate = new Date(dateToFormat);
  const dateFormated = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC',
  }).format(currentDate);

  return dateFormated;
}

function formatDateToField(date) {
  //Recebe uma data string : 2008-01-01T00:00:00.000Z e devolve apenas a data para uso nos componentes
  if (!date) {
    return;
  }
  const dateFormated = date.substring(0, 10);
  return dateFormated;
}

//Retorna primeira letra em Caixa alta
function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export {
  formatCurrency,
  formatNumber,
  formatDateBr,
  capitalize,
  formatDateToField,
};
