import React from 'react';
import { Task } from '../models/Task';
import { updateTaskStatus } from '../services/taskService';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const handleStatusChange = async () => {
        const newStatus = task.status === "IN PROGRESS" ? "DONE" : "IN PROGRESS";
        await updateTaskStatus(task.id, newStatus);
    };

    return (
        <div style={{ marginLeft: task.parentId ? 20 : 0 }}>
            <h3>{task.name} ({task.status})</h3>
            <input
                type="checkbox"
                checked={task.status === "DONE"}
                onChange={handleStatusChange}
            />
            {task.dependencies && task.dependencies.length > 0 && (
                <div>
                    <h4>Dependencies:</h4>
                    <ul>
                        {task.dependencies.map(dep => (
                            <li key={dep.id}>{dep.name} ({dep.status})</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
