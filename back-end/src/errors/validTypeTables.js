function validTypeTables() {
  return function (req, res, next) {
    const { data } = req.body;

    if (data.table_name.length < 2) {
      next({
        status: 400,
        message: "table_name must be two or more characters",
      });
    }

    if (typeof data.capacity !== "number") {
      next({ status: 400, message: "capacity must be a number." });
    }

    next();
  };
}

module.exports = validTypeTables;
