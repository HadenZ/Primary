// EventPlanner.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import './events.css';

function EventPlanner() {
  const [eventList, setEventList] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedEvent, setEditedEvent] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedStartDate, setEditedStartDate] = useState("");
  const [editedEndDate, setEditedEndDate] = useState("");
  const [newEvent, setNewEvent] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/getEventList')
      .then(result => {
        setEventList(result.data)
      })
      .catch(err => console.log(err))
  }, []);

  const toggleEditable = (id) => {
    const eventData = eventList.find((data) => data._id === id);
    if (eventData) {
      setEditableId(id);
      setEditedEvent(eventData.event);
      setEditedLocation(eventData.location);
      setEditedStartDate(eventData.startDate || "");
      setEditedEndDate(eventData.endDate || "");
    } else {
      setEditableId(null);
      setEditedEvent("");
      setEditedLocation("");
      setEditedStartDate("");
      setEditedEndDate("");
    }
  };

  const addEvent = (e) => {
    e.preventDefault();
    if (!newEvent || !newLocation || !newStartDate || !newEndDate) {
      alert("All fields must be filled out.");
      return;
    }

    axios.post('http://127.0.0.1:3000/addEventList', {
      event: newEvent,
      location: newLocation,
      startDate: newStartDate,
      endDate: newEndDate,
    })
    .then(res => {
      console.log(res);
      setEventList(prevEvents => [...prevEvents, res.data]); // Update the state with the new event
      setNewEvent(""); // Clear the input fields
      setNewLocation("");
      setNewStartDate("");
      setNewEndDate("");
    })
      .catch(err => console.log(err));
  }

  const saveEditedEvent = (id) => {
    const editedData = {
      event: editedEvent,
      location: editedLocation,
      startDate: editedStartDate,
      endDate: editedEndDate,
    };

    if (!editedEvent || !editedLocation || !editedStartDate || !editedEndDate) {
      alert("All fields must be filled out.");
      return;
    }

    axios.post(`http://127.0.0.1:3000/updateEventList/${id}`, editedData)
      .then(result => {
        console.log(result);
        setEditableId(null);
        setEditedEvent("");
        setEditedLocation("");
        setEditedStartDate("");
        setEditedEndDate("");
        setEventList(prevEvents => {
          const updatedEvents = prevEvents.map(event =>
            event._id === id ? { ...event, ...editedData } : event
          );
          return updatedEvents;
        });
      })
      .catch(err => console.log(err));
  }

  const deleteEvent = (id) => {
    axios.delete(`http://127.0.0.1:3000/deleteEventList/${id}`)
    .then(result => {
      console.log(result);
      setEditableId(null);
      setEditedEvent("");
      setEditedLocation("");
      setEditedStartDate("");
      setEditedEndDate("");
      setEventList(prevEvents => prevEvents.filter(event => event._id !== id));
    })
      .catch(err => console.log(err));
  }

  return (
    <div className="event-planner-container">
      <div className="event-planner-table">
        <h2>Event Planner</h2>
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(eventList) ? (
              <>
                {eventList.map((data) => (
                  <tr key={data._id}>
                    <td>
                      {editableId === data._id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedEvent}
                          onChange={(e) => setEditedEvent(e.target.value)}
                        />
                      ) : (
                        data.event
                      )}
                    </td>
                    <td>
                      {editableId === data._id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedLocation}
                          onChange={(e) => setEditedLocation(e.target.value)}
                        />
                      ) : (
                        data.location
                      )}
                    </td>
                    <td>
                      {editableId === data._id ? (
                        <input
                          type="datetime-local"
                          className="form-control"
                          value={editedStartDate}
                          onChange={(e) => setEditedStartDate(e.target.value)}
                        />
                      ) : (
                        data.startDate ? new Date(data.startDate).toLocaleString() : ''
                      )}
                    </td>
                    <td>
                      {editableId === data._id ? (
                        <input
                          type="datetime-local"
                          className="form-control"
                          value={editedEndDate}
                          onChange={(e) => setEditedEndDate(e.target.value)}
                        />
                      ) : (
                        data.endDate ? new Date(data.endDate).toLocaleString() : ''
                      )}
                    </td>
                    <td>
                      {editableId === data._id ? (
                        <button className="btn btn-success" onClick={() => saveEditedEvent(data._id)}>
                          Save
                        </button>
                      ) : (
                        <button className="btn btn-primary" onClick={() => toggleEditable(data._id)}>
                          Edit
                        </button>
                      )}
                      <button className="btn btn-danger" onClick={() => deleteEvent(data._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="5">Loading events...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="event-planner-form">
        <h2>Add Event</h2>
        <form>
          <div className="form-group">
            <label>Event</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Event"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Location"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="datetime-local"
              className="form-control"
              value={newStartDate}
              onChange={(e) => setNewStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="datetime-local"
              className="form-control"
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
            />
          </div>
          <button type="button" onClick={addEvent} className="btn btn-success">
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventPlanner;
