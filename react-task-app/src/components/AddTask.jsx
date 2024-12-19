function AddTask({ taskInput, setTaskInput, addTask }) {
    return (
        <div>
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Add a task"
            />
            <button onClick={addTask}>Add</button>
        </div>
    );
}

export default AddTask;
