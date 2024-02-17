import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import axios from "axios";
import "./tasker.css";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import notask from "../../assets/notask.png";

function Tasker() {
  const initialValues = {
    selectedOption: null,
    task: "",
  };
  const [tasks, setTasks] = useState([]);
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState();
  const [no, setNo] = useState(false);

  const optionsRef = useRef(options);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7700/superadmin/allusers"
        );
        setOptions(response.data.users);
        optionsRef.current = response.data.users;
        console.log("Options : ", optionsRef.current);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    getUser();
  }, []);
  useEffect(() => {
    const statusCounts = tasks.reduce((acc, task) => {
      const status = task.status;

      if (!acc[status]) {
        acc[status] = 1;
      } else {
        acc[status]++;
      }

      return acc;
    }, {});
    setCount(statusCounts);
    console.log(statusCounts, "count");
  }, [tasks]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selected) => {
    console.log(selected.value, "jj");
    setSelectedOption(selected.value);
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:7700/superadmin/tasker",
        values
      );
      console.log(response, "----");
      toast.success(response.data.message);
      resetForm();
    } catch (error) {
      if (
        (error.response && error.response.status === 401) ||
        error.response.status === 404
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const userTask = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7700/user/usertask?userId=${selectedOption}`
      );
      setTasks(response.data.tasks || []);
      setNo(true);
    } catch (error) {
      if (
        (error.response && error.response.status === 401) ||
        error.response.status === 404
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container">
      <div className="boxer">
        <div className="box">
          <form className="form" onSubmit={formik.handleSubmit}>
            <h3 style={{ marginBottom: "20px" }}>Add Task</h3>
            <div className="select-container">
              <Select
                name="selectedOption"
                value={formik.values.selectedOption}
                onChange={(selectedOption) =>
                  formik.setFieldValue("selectedOption", selectedOption)
                }
                options={optionsRef.current}
                classNamePrefix="react-select"
                placeholder="Select User"
                style={{ width: "30%" }}
              />
            </div>
            <br />

            <div className="flex-column">
              <label>Task</label>
              <textarea
                id="task"
                name="task"
                value={formik.values.task}
                onChange={formik.handleChange}
                className="Taskinput"
              />
            </div>

            <div>
              <button type="submit" className="addUserButton">
                Add Task
              </button>
            </div>
          </form>
        </div>

        <div className="box">
          <form className="form">
            <h3 style={{ marginBottom: "20px" }}>View User Task</h3>
            <div className="select-container">
              <Select
                name="selectedOption"
                onChange={handleSelectChange}
                options={optionsRef.current}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select User"
              />
            </div>

            <div>
              <button
                type="button"
                className="addUserButton"
                onClick={userTask}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      {tasks.length !== 0 && (
        <div
          className="task-count"
          style={{ border: "1px solid", padding: "8px" }}
        >
          <p>Pending: {count.Pending || 0}</p>
          <p>In Progress: {count.progress || 0}</p>
          <p>Finished: {count.finished || 0}</p>
        </div>
      )}
      {tasks.length !== 0 ? (
        <table className="tasker-task-table">
          <thead>
            <tr>
              <th style={{ width: "50%" }}>Task</th>
              <th>Status</th>
              <th>Assigned Date</th>
              <th>Finished Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.task}</td>
                <td>{task.status}</td>
                <td>{task.createdAt}</td>
                <td>
                  {task.status === "finished"
                    ? task.finishedAt
                      ? task.finishedAt
                      : "not yet"
                    : task.status === "Pending"
                    ? "not yet"
                    : "In progress"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-tasks">
          {no && (
            <div>
              <img src={notask} alt="kinster logo" style={{ width: "300px" }} />
              <h1>No tasks</h1>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Tasker;
