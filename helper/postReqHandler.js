exports.postReqQuery = (name, safeParams) =>
  `INSERT INTO ${name}s (${safeParams.join(", ")}) VALUES (${safeParams
    .map(p => `$${p}`)
    .join(", ")})`;

exports.postValuesHandler = request => {
  const insertValues = Object.keys(request.body).reduce((acc, prop) => {
    acc[`$${prop}`] = request.body[prop];
    return acc;
  }, {});
  return { ...insertValues, $created_date: new Date().toISOString() };
};
