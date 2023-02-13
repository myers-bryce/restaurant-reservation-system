const reservationsService = require("../reservations/reservations.service");

function reservationExists(req, res, next) {
  let resId = "";
  if (req.params.reservation_id) {
    resId = req.params.reservation_id;
  } else if (!req.params.reservation_id) {
    resId = req.body.data.reservation_id;
  }
  reservationsService
    .read(resId)
    .then((reservation) => {
      if (reservation) {
        res.locals.foundReservation = reservation;
        return next();
      }
      next({
        status: 404,
        message: `Reservation ${resId} cannot be found.`,
      });
    })
    .catch(next);
}

module.exports = reservationExists;
