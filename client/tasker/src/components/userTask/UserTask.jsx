import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./UserTask.css";
import notask from "../../assets/notask.png"
function UserTask() {
  const userId = useSelector((state) => state.user.userData.employeeID);
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState();
  const handleStatusChange = async (index) => {
    try {
      const correctIndex = tasks.length - 1 - index;
      const response = await axios.get(
        `http://localhost:7700/user/updateTaskStatus/?taskIndex=${correctIndex}&employeeID=${userId}`
      );
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Error updating task status", error.message);
    }
  };

  useEffect(() => {
    const getUserTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7700/user/usertask?userId=${userId}`
        );
        setTasks(response.data.tasks || []);
      } catch (error) {
        console.error("Error fetching user tasks", error.message);
      }
    };

    getUserTasks();
  }, [userId]);

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

  return (
    <div className="user-task-container">
      {tasks.length !== 0 ? (
        <div>
          <div className="task-count">
            <p>Pending: {count.Pending || 0}</p>
            <p>In Progress: {count.progress || 0}</p>
            <p>Finished: {count.finished || 0}</p>
          </div>
          <table className="task-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Assigned Date</th>
                <th>Finished Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks
                .slice()
                .reverse()
                .map((task, index) => (
                  <tr key={index}>
                    <td  style={{maxWidth:'500px'}}  >{task.task}</td>
                    <td>{task.status}</td>
                    <td>{task.createdAt}</td>
                    <td>
                      {task.status === "finished"
                        ? task.finishedAt || "not yet"
                        : task.status === "Pending"
                        ? "not yet"
                        : "In progress"}
                    </td>
                    <td>
                      {task.status === "Pending" && (
                        <button
                          className="action-button red"
                          onClick={() => handleStatusChange(index)}
                        >
                          Pending
                        </button>
                      )}
                      {task.status === "progress" && (
                        <button
                          className="action-button orange"
                          onClick={() => handleStatusChange(index)}
                        >
                          In Progress
                        </button>
                      )}
                      {task.status === "finished" && (
                        <button className="action-button green" disabled>
                          Completed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-tasks">
          <img src={notask} alt="kinster logo" style={{width:'400px'}} />
          <h1>No tasks</h1>
        </div>
      )}
    </div>
  );
}

export default UserTask;
