function validType() {
  return function (req, res, next) {
    const { data } = req.body;
    // regular expression to match required date format
    const reDate = /^(\d{4})-(\d{1,2})-(\d{1,2})/;
    // regular expression to match required time format
    const reTime = /^\d{1,2}:\d{2}([ap]m)?$/;

    if (typeof data.people !== "number") {
      next({ status: 400, message: "people must be a number." });
    }

    if (!data.reservation_date.match(reDate)) {
      next({ status: 400, message: "Please enter a valid reservation_date." });
    }

    if (!data.reservation_time.match(reTime)) {
      next({ status: 400, message: "Please enter a valid reservation_time." });
    }
    let splitTime = data.reservation_time.split(":");
    let thisDay = new Date(
      `${data.reservation_date}T${splitTime[0]}:${splitTime[1]}:00`
    );
    let tuesdayCheck = new Date(`${data.reservation_date}`);

    const resYear = thisDay.getUTCFullYear();
    const resMonth = thisDay.getUTCMonth();
    const resDay = thisDay.getUTCDate();

    const todayDate = new Date();
    const todayYear = todayDate.getUTCFullYear();
    const todayMonth = todayDate.getUTCMonth();
    const todayDay = todayDate.getUTCDate();

    const resFull = `${resYear}${resMonth}${resDay}`;
    const todayFull = `${todayYear}${todayMonth}${todayDay}`;

    if (tuesdayCheck.getUTCDay() === 2) {
      next({ status: 400, message: "Sorry, we are closed on Tuesdays." });
    }
    // if (thisDay.getUTCDate() < Date.now()) {
    if (resFull < todayFull) {
      next({
        status: 400,
        message: "You don't have a time machine, pick a future day.",
      });
    }

    // console.log(data.reservation_time.split(":"));
    let reservationTimeHours = splitTime[0];
    let reservationTimeMinutes = splitTime[1];

    if (reservationTimeMinutes <= 30) {
      if (reservationTimeHours <= 10) {
        next({
          status: 400,
          message: "Time is too early, choose a later time.",
        });
      }
    }
    if (reservationTimeMinutes >= 30) {
      if (reservationTimeHours >= 21) {
        next({
          status: 400,
          message: "Time is too late, choose earlier or a later date.",
        });
      }
    }
    next();
  };
}

module.exports = validType;
