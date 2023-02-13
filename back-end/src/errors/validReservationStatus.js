async function resStatusCheck(req, res, next) {
  const currentStatus = res.locals.foundReservation.status;
  const updatedStatus = req.body.data.status;
  if (updatedStatus === "unknown") {
    next({ status: 400, message: `Unknown status ${updatedStatus}` });
  }
  if (currentStatus === "finished") {
    next({
      status: 400,
      message: `Reservation ${res.locals.foundReservation.reservation_id} has status of ${currentStatus}`,
    });
  }
  next();
}

module.exports = resStatusCheck;
