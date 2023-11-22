import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import axios from "axios";
import "./Calendar.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const currentDate = dayjs();

  const [today, setToday] = useState(currentDate);

  const [selectDate, setSelectDate] = useState(currentDate);

  // State to store events fetched from the server
  const [events, setEvents] = useState([]);

  // Function to fetch events from the server
  const fetchEvents = () => {
    axios.get("http://127.0.0.1:3000/getEventList")
      .then(result => {
        setEvents(result.data);
      })
      .catch(err => console.log(err));
  };

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    const arrayOfDate = [];

    for (let i = 0; i < firstDateOfMonth.day(); i++) {
      arrayOfDate.push({
        date: firstDateOfMonth.subtract(firstDateOfMonth.day() - i, "day"),
        currentMonth: false,
      });
    }

    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
      arrayOfDate.push({
        date: firstDateOfMonth.date(i),
        currentMonth: true,
        today:
          firstDateOfMonth.date(i).toDate().toDateString() ===
          dayjs().toDate().toDateString(),
      });
    }

    const remaining = 42 - arrayOfDate.length;

    for (let i = 1; i <= remaining; i++) {
      arrayOfDate.push({
        date: lastDateOfMonth.add(i, "day"),
        currentMonth: false,
      });
    }

    return arrayOfDate;
  };

  return (
    <div className="flex w-full mx-auto divide-x-2 gap-10 h-screen items-center">
      <div className="w-96 h-96">
        <div className="flex justify-between">
          <h1 className="font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>

          <div className="flex items-center gap-5">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className="cursor-pointer"
              onClick={() => {
                setToday(currentDate);
                setSelectDate(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-7 text-gray-500">
          {days.map((day, index) => {
            return (
              <h1 key={index} className="h-14 grid place-content-center">
                {day}
              </h1>
            );
          })}
        </div>
        <div className="w-full grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              const dateEvents = events.filter(event =>
                dayjs(event.startDate).isSame(date, 'day')
              );

              return (
                <div
                  key={index}
                  className="h-14 border-t grid place-content-center relative text-sm"
                >
                  <h1
                    className={cn(
                      currentMonth ? "" : "text-gray-400",
                      today ? "bg-cyan-600 text-black" : "",
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-white text-black"
                        : "",
                      "h-10 w-10 grid place-content-center rounded-full hover:bg-white hover:text-black transition-all cursor-pointer"
                    )}
                    onClick={() => {
                      setSelectDate(date);
                    }}
                  >
                    {date.date()}
                    {dateEvents.length > 0 && <div className="dot"></div>}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div>
        <h1 className="font-semibold">
          Schedule for {selectDate.toDate().toDateString()}
        </h1>
        {events
          .filter(event => dayjs(event.startDate).isSame(selectDate, 'day'))
          .map((event, index) => (
            <div key={index}>
              <p>{event.event}</p>
              <p>Location: {event.location}</p>
              <p>Start Date: {dayjs(event.startDate).format('YYYY-MM-DD HH:mm')}</p>
              <p>End Date: {dayjs(event.endDate).format('YYYY-MM-DD HH:mm')}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Calendar;
