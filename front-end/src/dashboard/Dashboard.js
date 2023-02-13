import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import formatDisplayDate from "../utils/format-display-date";
import useQuery from "../utils/useQuery";
import DateNavigation from "./DateNavigation";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList";
import CurrentTime from "../widgets/CurrentTime";
import TablesList from "../tables/TablesList";

function Dashboard({ date }) {
  const urlDate = useQuery().get("date");
  if (urlDate) {
    date = urlDate;
  }

  const [reservations, setReservations] = useState("loading");
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState("loading");
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadReservations, [date]);
  useEffect(loadTables, []);

  function loadReservations() {
    setReservations("loading");
    setReservationsError(null);

    const abortController = new AbortController();

    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    setTables("loading");

    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }

  // convert YYYY-MM-DD to a more user-friendly format, examples:
  // const displayDate = formatDisplayDate(date);
  // const displayDateShort = formatDisplayDate(date, "short");
  const displayDateLong = formatDisplayDate(date, "long");

  return (
    <main>
      <div className="row">
        <div className="my-3 col-12 mx-auto">
          <h2 className="mb-0 text-center">{displayDateLong}</h2>
          <DateNavigation date={date} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mx-auto">
          <fieldset className="border m-0 border-dark border-bottom-0 p-3">
            <legend className="pl-2 sticky-top shadow rounded bg-dark">
              <CurrentTime sectionTitle={"Reservations"} />
            </legend>
            <ReservationsList reservations={reservations} />
            <ErrorAlert error={reservationsError} />
          </fieldset>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 mx-auto">
          <fieldset className="border m-0 border-dark border-bottom-0 p-3">
            <legend className="pl-2 sticky-top text-white shadow rounded bg-dark">
              Tables
            </legend>
            <TablesList tables={tables} />
            <ErrorAlert error={tablesError} />
          </fieldset>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
