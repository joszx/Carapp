import { useState, useEffect, useRef } from "react";
import axios from "axios";

const client = axios.create({
  baseURL:
    "https://us-central1-cs3219-otot-b-367514.cloudfunctions.net/calenderific",
});

export default function NextHolidayName() {
  const [nextHolidayName, setNextHolidayName] = useState("");
  const [nextHolidayDesc, setNextHolidayDesc] = useState("");
  const [nextHolidayDate, setNextHolidayDate] = useState("");

  const fetchNextHoliday = async () => {
    let response = await client.get();
    console.log(response.data);
    setNextHolidayName(response.data.name);
    setNextHolidayDesc(response.data.description);
    setNextHolidayDate(response.data.date.iso);
  };

  useEffect(() => {
    fetchNextHoliday();
  }, []);

  return (
    <div>
      <section className="hero is-link">
        <div className="hero-body">
          <p className="title">Upcoming holiday:</p>
          <p className="subtitle">
            {nextHolidayName} on {nextHolidayDate}
            <br></br>
            {nextHolidayDesc}
          </p>
        </div>
      </section>
    </div>
  );
}
