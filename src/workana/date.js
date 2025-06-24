const dayjs = require('dayjs');

function parseRelativeDate(rawDate) {
  const now = dayjs();
  if (!rawDate) return null;

  const cleaned = rawDate
    .toLowerCase()
    .replace('published:', '')
    .replace('publicado:', '')
    .replace('atrás', '')
    .replace('há', '')
    .trim();

  // Casos fixos
  if (/^today|hoje$/.test(cleaned)) return now.format('YYYY-MM-DD HH:mm');
  if (/^yesterday|ontem$/.test(cleaned)) return now.subtract(1, 'day').format('YYYY-MM-DD HH:mm');

  // Expressões relativas
  const regex = /(\d+)\s+(minute|hour|day|week|month|minutes|hours|days|weeks|months|minuto|minutos|hora|horas|dia|dias|semana|semanas|mês|meses)/;
  const match = cleaned.match(regex);

  if (!match) return null;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const unitsMap = {
    minuto: 'minute',
    minutos: 'minute',
    minute: 'minute',
    minutes: 'minute',

    hora: 'hour',
    horas: 'hour',
    hour: 'hour',
    hours: 'hour',

    dia: 'day',
    dias: 'day',
    day: 'day',
    days: 'day',

    semana: 'day',
    semanas: 'day',
    week: 'day',
    weeks: 'day',

    mês: 'month',
    mes: 'month',
    meses: 'month',
    month: 'month',
    months: 'month',
  };

  const mappedUnit = unitsMap[unit];
  if (!mappedUnit) return null;

  const amount = unit.includes('semana') || unit.includes('week') ? value * 7 : value;
  return now.subtract(amount, mappedUnit).format('YYYY-MM-DD HH:mm');
}

module.exports = parseRelativeDate;
