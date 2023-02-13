const tableService = require("../tables/tables.service");

function tableExists(req, res, next) {
  tableService
    .read(req.params.table_id)
    .then((table) => {
      if (table) {
        res.locals.foundTable = table;
        return next();
      }
      next({
        status: 404,
        message: `Table ${req.params.table_id} cannot be found.`,
      });
    })
    .catch(next);
}

module.exports = tableExists;
