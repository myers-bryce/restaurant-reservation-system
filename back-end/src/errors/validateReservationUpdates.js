function validateReservationUpdates(req, res, next) {
  const {
    first_name,
    last_name,
    people,
    reservation_date,
    reservation_time,
    mobile_number,
  } = req.body.data;

  let errorField = "";

  switch (true) {
    case !first_name || first_name.length < 1:
      errorField = "first_name";
      break;
    case !last_name || last_name.length < 1:
      errorField = "last_name";
      break;
    case !mobile_number || mobile_number.length < 1:
      errorField = "mobile_number";
      break;
    case !reservation_time:
      errorField = "reservation_time";
      break;
    case !reservation_date:
      errorField = "reservation_date";
      break;
    case people === 0:
      errorField = "people";
      break;
    default:
      break;
  }

  if (errorField) {
    next({ status: 400, message: `${errorField} is invalid.` });
  }
  next();
}

module.exports = validateReservationUpdates;
