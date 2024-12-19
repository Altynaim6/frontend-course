import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

function AddTask() {
    const [taskInput, setTaskInput] = useState('');
    const { addTask } = useTasks();

    const handleAddTask = () => {
        addTask(taskInput);
        setTaskInput('');
    };

    return (
        <div style={{ display: 'flex', marginBottom: '20px' }}>
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
}

export default AddTask;
