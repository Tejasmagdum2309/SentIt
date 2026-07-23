export const isValidEmail =  (email) => {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

export const validateValuesInSheet = (rows, column , validatorFunction) => {

  const all = rows.map((row, index) => {
    const rowValue = row[column];
    const valid = validatorFunction(rowValue);
    return { ...row, _rowIndex: index + 2, isValidValue: valid }; // +2 accounts for header row + 1-based indexing
  });

  const valid = all.filter(r => r.isValidValue);
  const invalid = all.filter(r => !r.isValidValue);

  const summary = {
    total: all.length,
    validCount: valid.length,
    invalidCount: invalid.length,
  };

  return { all, valid, invalid, summary };
}

export const validateCellLength = (rows, maxLength = 200) => {
  for (const row of rows) {
    const values = Object.values(row);

    for (const value of values) {
      if (typeof value === "string" && value.length > maxLength) {
        return false;
      }
    }
  }

  return true;
};