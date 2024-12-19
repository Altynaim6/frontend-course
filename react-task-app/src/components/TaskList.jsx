import React from 'react';
import TaskItem from './TaskItem';
import { useTasks } from '../context/TaskContext';

function TaskList() {
    const { tasks, deleteTask } = useTasks();

    return (
        <ul>
            {tasks.map((task, index) => (
                <TaskItem key={index} task={task} onDelete={() => deleteTask(index)} />
            ))}
        </ul>
    );
}

export default TaskList;
