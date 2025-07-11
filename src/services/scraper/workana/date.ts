import dayjs from 'dayjs';

export function parseRelativeDate(rawDate?: string | null): string | null {
  if (!rawDate) return null;

  const now = dayjs();

  const cleaned = rawDate
    .toLowerCase()
    .replace(/published:|publicado:|há|atrás/gi, '')
    .trim();

  if (/^(hoje|today)$/.test(cleaned)) return now.format('YYYY-MM-DD HH:mm');
  if (/^(ontem|yesterday)$/.test(cleaned)) return now.subtract(1, 'day').format('YYYY-MM-DD HH:mm');

  const regex = /(\d+)\s+(minuto|minutos|hora|horas|dia|dias|semana|semanas|mês|meses|minute|minutes|hour|hours|day|days|week|weeks|month|months)/;
  const match = cleaned.match(regex);

  if (!match) return null;

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  const unitsMap: Record<string, 'minute' | 'hour' | 'day' | 'month'> = {
    minuto: 'minute', minutos: 'minute', minute: 'minute', minutes: 'minute',
    hora: 'hour', horas: 'hour', hour: 'hour', hours: 'hour',
    dia: 'day', dias: 'day', day: 'day', days: 'day',
    semana: 'day', semanas: 'day', week: 'day', weeks: 'day',
    mês: 'month', mes: 'month', meses: 'month', month: 'month', months: 'month',
  };

  const mappedUnit = unitsMap[unit];
  if (!mappedUnit) return null;

  const amount = ['semana', 'semanas', 'week', 'weeks'].includes(unit) ? value * 7 : value;
  return now.subtract(amount, mappedUnit).format('YYYY-MM-DD HH:mm');
}
