/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { addTask } from '../services/taskService';

const TaskForm: React.FC = () => {
    const [taskName, setTaskName] = useState<string>('');
    const [parentTaskId, setParentTaskId] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTask = {
            id: `${Date.now()}`,
            name: taskName,
            status: 'IN PROGRESS',
            parentId: parentTaskId || undefined,
            dependencies: [],
            totalDependencies: 0,
            doneDependencies: 0,
            completeDependencies: 0,
        };
        try {
            await addTask(newTask);
            setTaskName('');
            setParentTaskId('');
        } catch (err) {
            alert('Failed to add task');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task Name"
                required
            />
            <input
                type="text"
                value={parentTaskId}
                onChange={(e) => setParentTaskId(e.target.value)}
                placeholder="Parent Task ID (optional)"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;