import React from 'react';

function TaskItem({ task, onDelete }) {
    return (
        <li>
            <span>{task}</span>
            <button onClick={onDelete}>Delete</button>
        </li>
    );
}

export default TaskItem;
