import React, { useState, useEffect } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]); // State for tasks
  const [newTask, setNewTask] = useState(""); // State for new task input

  // Load tasks from localStorage when the app starts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask(""); // Clear input field
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Function to toggle task completion
  const toggleCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add a task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask} disabled={newTask.trim() === ""}>
        Add
      </button>

      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={task.completed ? "completed" : ""}
          >
            {task.text}
            <button onClick={() => toggleCompletion(index)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
