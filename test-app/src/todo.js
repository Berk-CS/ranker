import React, { useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]); // State for tasks
  const [newTask, setNewTask] = useState(""); // State for new task input

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask(""); // Clear input field
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add a task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
