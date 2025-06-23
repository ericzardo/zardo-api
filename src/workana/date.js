const dayjs = require('dayjs');

function parseRelativeDate(rawDate) {
  const now = dayjs();
  const match = rawDate?.match(/há\s+(\d+)\s+(\w+)/i);
  if (!match) return null;

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  const unitsMap = {
    minuto: 'minute',
    minutos: 'minute',
    hora: 'hour',
    horas: 'hour',
    dia: 'day',
    dias: 'day',
    semana: 'day',
    semanas: 'day',
    mes: 'month',
    mês: 'month',
    meses: 'month',
  };

  const mappedUnit = unitsMap[unit];
  if (!mappedUnit) return null;

  const amount = unit.includes('semana') ? value * 7 : value;
  return now.subtract(amount, mappedUnit).format('YYYY-MM-DD HH:mm');
}

module.exports = parseRelativeDate;
