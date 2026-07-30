export function parseVariables(variables) {
  if (!variables) return {};

  if (typeof variables === 'string') {
    try {
      const parsed = JSON.parse(variables);
      return typeof parsed === 'object' && parsed !== null ? parsed : {};
    } catch {
      return {};
    }
  }

  if (typeof variables === 'object') {
    return variables;
  }

  return {};
}

export function replacePlaceholders(template, variables) {
  if (!template) return '';

  const vars = parseVariables(variables);

  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (vars[key] === undefined || vars[key] === null) {
      return match;
    }
    return String(vars[key]);
  });
}

export function formatVariables(variables) {
  const vars = parseVariables(variables);
  const entries = Object.entries(vars);

  if (entries.length === 0) {
    if (!variables) return '—';
    if (typeof variables === 'string') return variables;
    return '—';
  }

  return entries.map(([key, item]) => `${key}: ${item}`).join(' · ');
}

export default formatVariables;
