import { createContext } from "react";
import { useTaskManager } from "../hooks/useTaskManager";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const taskManager = useTaskManager();

    return (
        <TaskContext.Provider value={taskManager}>
            {children}
        </TaskContext.Provider>
    );
}
