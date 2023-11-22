import axios from "axios";
import React, { useEffect, useState } from "react";
import "./todo.css";

const ToDo = () => {
  const [todoList, setTodoList] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");

  // Fetch tasks from the database
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/getTodoList")
      .then((result) => {
        setTodoList(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to toggle the editable state for a specific row
  const toggleEditable = (id) => {
    const rowData = todoList.find((data) => data._id === id);
    if (rowData) {
      setEditableId(id);
      setEditedTask(rowData.task);
      setEditedStatus(rowData.status);
      setEditedDeadline(rowData.deadline || "");
    } else {
      setEditableId(null);
      setEditedTask("");
      setEditedStatus("");
      setEditedDeadline("");
    }
  };

  // Function to add a task to the database
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask || !newStatus || !newDeadline) {
      alert("All fields must be filled out.");
      return;
    }

    axios
      .post("http://127.0.0.1:3000/addTodoList", {
        task: newTask,
        status: newStatus,
        deadline: newDeadline,
      })
      .then((res) => {
        console.log(res);
        setTodoList((prevTasks) => [...prevTasks, res.data]); // Update the state with the new task
        setNewTask(""); // Clear the input fields
        setNewStatus("");
        setNewDeadline("");
      })
      .catch((err) => console.log(err));
  };

  // Function to save edited data to the database
  const saveEditedTask = (id) => {
    const editedData = {
      task: editedTask,
      status: editedStatus,
      deadline: editedDeadline,
    };

    // If the fields are empty
    if (!editedTask || !editedStatus || !editedDeadline) {
      alert("All fields must be filled out.");
      return;
    }

    // Update edited data in the database through the updateById API
    axios
      .post(`http://127.0.0.1:3000/updateTodoList/${id}`, editedData)
      .then((result) => {
        console.log(result);
        setEditableId(null);
        setEditedTask("");
        setEditedStatus("");
        setEditedDeadline("");
        setTodoList((prevTasks) => {
          const updatedTasks = prevTasks.map(task =>
            task._id === id ? { ...task, ...editedData } : task
          );
          return updatedTasks;
        });
      })
      .catch((err) => console.log(err));
  };

  // Delete task from the database
  const deleteTask = (id) => {
    axios
      .delete(`http://127.0.0.1:3000/deleteTodoList/${id}`)
      .then((result) => {
        console.log(result);
        setEditableId(null);
        setEditedTask("");
        setEditedStatus("");
        setEditedDeadline("");
        setTodoList((prevTasks) => prevTasks.filter(task => task._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="todo-container">
      <div className="row">
        <div className="col">
          <div className="table-responsive">
            <table className="table">
              <thead className="table-primary">
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {Array.isArray(todoList) ? (
                <tbody>
                  {todoList.map((data) => (
                    <tr key={data._id}>
                      <td>
                        {editableId === data._id ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                          />
                        ) : (
                          data.task
                        )}
                      </td>
                      <td>
                        {editableId === data._id ? (
                          <input
                            type="text"
                            className="form-control"
                            value={editedStatus}
                            onChange={(e) => setEditedStatus(e.target.value)}
                          />
                        ) : (
                          data.status
                        )}
                      </td>
                      <td>
                        {editableId === data._id ? (
                          <input
                            type="datetime-local"
                            className="form-control"
                            value={editedDeadline}
                            onChange={(e) => setEditedDeadline(e.target.value)}
                          />
                        ) : data.deadline ? (
                          new Date(data.deadline).toLocaleString()
                        ) : (
                          ""
                        )}
                      </td>

                      <td>
                        {editableId === data._id ? (
                          <button
                            className="btn btn-success "
                            onClick={() => saveEditedTask(data._id)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary "
                            onClick={() => toggleEditable(data._id)}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          className="btn btn-danger "
                          onClick={() => deleteTask(data._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="4">Loading ...</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>

        <div className="col">
          <h2 className="text-center mb-4">ADD TASK</h2>
          <form className="bg-light p-4">
            <div className="mb-3">
              <label>Task</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Status</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Deadline</label>
              <input
                className="form-control"
                type="datetime-local"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
              />
            </div>
            <div className="add-task-button">
              <button type="button" onClick={addTask} className="btn btn-success">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ToDo;