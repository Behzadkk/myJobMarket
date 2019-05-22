exports.putReqHandler = (req, safeParams) => {
  const editingProject = req.body;
  let updatedDetails = "UPDATE projects SET ";
  safeParams.forEach(par => {
    if (editingProject[par]) {
      updatedDetails += ` ${par} = "${editingProject[par]}",`;
    }
  });
  updatedDetails += ` updated_date = "${new Date().toISOString()}" WHERE id = ?`;
  return updatedDetails;
};
