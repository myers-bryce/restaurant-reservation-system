import React from "react";
import { today, previous, next } from "../utils/date-time";
import { Link } from "react-router-dom";

/**
 * DateNavigation allows the user to change the active date for the Dashboard.
 */

function DateNavigation({ date }) {
  return (
    <>
      <h5 className="text-center text-decoration-underline mt-2 text-monospace">
        Date Navigation
      </h5>
      <nav
        className="nav bg-light mb-1 mx-auto w-75 text-center justify-content-center"
        aria-label="Change date"
      >
        <Link
          className="nav-link border-left-0 border bg-white border-secondary"
          to={`/dashboard?date=${previous(date)}`}
          aria-label="Previous"
        >
          <span aria-hidden="true" className="font-weight-bold font-size-12">
            &laquo;{" "}
          </span>
          <span>Previous</span>
        </Link>
        <Link
          className="nav-link border border-info mx-3 bg-white px-2"
          to={`/dashboard?date=${today()}`}
          aria-label="Today"
        >
          <span>Today</span>
        </Link>
        <Link
          className="nav-link border-right-0 border bg-white border-secondary"
          to={`/dashboard?date=${next(date)}`}
          aria-label="Next"
        >
          <span>Next</span>
          <span aria-hidden="true" className="font-weight-bold">
            {" "}
            &raquo;
          </span>
        </Link>
      </nav>
    </>
  );
}

export default DateNavigation;
