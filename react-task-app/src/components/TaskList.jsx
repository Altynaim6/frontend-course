import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

function TaskList() {
    const { tasks } = useContext(TaskContext);

    return (
        <ul>
            {tasks.map((task, index) => (
                <TaskItem key={index} task={task} />
            ))}
        </ul>
    );
}

export default TaskList;
