import { TaskProvider } from "../src/context/TaskContext";
import TaskList from "../src/components/TaskList";
import AddTask from "../src/components/AddTask";

function App() {
  return (
    <TaskProvider>
      <div>
        <h1>Task Manager</h1>
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;

