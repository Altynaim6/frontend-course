import { useState } from "react";
import TaskList from "../src/components/TaskList";
import AddTask from "../src/components/AddTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput]);
      setTaskInput("");
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <AddTask taskInput={taskInput} setTaskInput={setTaskInput} addTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
