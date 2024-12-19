import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

function AddTask() {
    const { addTask } = useContext(TaskContext);
    const [taskInput, setTaskInput] = useState("");

    const handleAddTask = () => {
        if (taskInput.trim()) {
            addTask(taskInput);
            setTaskInput("");
        }
    };

    return (
        <div>
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Add a task"
            />
            <button onClick={handleAddTask}>Add</button>
        </div>
    );
}

export default AddTask;
