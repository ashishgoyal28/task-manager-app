import { useState, useEffect } from "react";
import API from "../services/api";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setTasks(res.data);
  
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
  
      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert("Task Deleted");
  
      fetchTasks();
  
    } catch (error) {
      console.log(error);
  
      alert("Delete Failed");
    }
  };
  const handleUpdateStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");
  
      await API.put(
        `/tasks/${id}`,
        {
          status: "completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert("Task Updated");
  
      fetchTasks();
  
    } catch (error) {
      console.log(error);
  
      alert("Update Failed");
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/tasks",
        {
          title,
          description,
          status: "pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      alert("Task Added");
      fetchTasks();

      setTitle("");
      setDescription("");

    } catch (error) {
      console.log(error);

      alert("Failed to add task");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
  
    window.location.href = "/";
  };

  return (
    <div className="container">
      <h1>Task Dashboard</h1>
      <button
  className="logout-btn"
  onClick={handleLogout}
>
  Logout
</button>

<form onSubmit={handleAddTask} className="form"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "30px" }}>
  <h2>Your Tasks</h2>

  {tasks.map((task) => (
    <div className="task-card" key={task._id}
      style={{
        border: "1px solid gray",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>Status: {task.status}</p>
      <button onClick={() => handleDelete(task._id)}>
  Delete
</button>
<button
  disabled={task.status === "completed"}
  onClick={() => handleUpdateStatus(task._id)}
>
  {task.status === "completed"
    ? "Completed"
    : "Mark Completed"}
</button>
    </div>
  ))}
</div>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default Dashboard;