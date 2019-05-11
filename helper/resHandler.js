exports.resHandler = (err, rows) => {
  if (err) {
    console.log("ERROR fetching from the database:", err);
    return;
  }
  console.log("Request succeeded, new data fetched", rows);
};
