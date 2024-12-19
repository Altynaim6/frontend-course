import React, { createContext, useContext, useState } from 'react';
import useTaskManager from '../hooks/useTaskManager';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const { tasks, addTask, deleteTask } = useTaskManager();

    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
