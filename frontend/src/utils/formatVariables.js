function formatVariables(variables) {
  if (!variables) return '—';

  let value = variables;

  if (typeof value === 'string') {
    try {
      value = JSON.parse(value);
    } catch {
      return value;
    }
  }

  if (typeof value !== 'object') {
    return String(value);
  }

  const entries = Object.entries(value);

  if (entries.length === 0) return '—';

  return entries.map(([key, item]) => `${key}: ${item}`).join(' · ');
}

export default formatVariables;
