/* eslint-disable prefer-const */
import { Task } from '../models/Task';

// Mock data for tasks
let tasks: Task[] = [
    { id: '1', name: 'Task 1', status: 'IN PROGRESS', dependencies: [] },
    { id: '2', name: 'Task 2', status: 'DONE', dependencies: [] },
];

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
    return tasks;
};

// Update the status of a task
export const updateTaskStatus = async (taskId: string, newStatus: 'IN PROGRESS' | 'DONE'): Promise<void> => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = newStatus;
        propagateTaskStatusChange(task);
    }
};

// Add a new task
export const addTask = async (newTask: Task): Promise<void> => {
    // Prevent circular dependencies
    if (checkCircularDependency(newTask, newTask.parentId)) {
        throw new Error('Circular dependency detected');
    }

    tasks.push(newTask);
};

// Check if there are circular dependencies
const checkCircularDependency = (task: Task, parentId?: string): boolean => {
    let currentParent = tasks.find(t => t.id === parentId);
    while (currentParent) {
        if (currentParent.id === task.id) return true;
        currentParent = tasks.find(t => t.id === currentParent.parentId);
    }
    return false;
};

// Propagate status change up the hierarchy (Done -> Complete)
const propagateTaskStatusChange = (task: Task) => {
    // Example logic for propagating changes to parent tasks
    if (task.status === 'DONE' && task.dependencies) {
        const allDependenciesComplete = task.dependencies.every(dep => dep.status === 'COMPLETE');
        if (allDependenciesComplete) {
            task.status = 'COMPLETE';
        }
    }

    // Propagate changes to the parent task (if any)
    if (task.parentId) {
        const parentTask = tasks.find(t => t.id === task.parentId);
        if (parentTask && parentTask.status === 'IN PROGRESS') {
            parentTask.status = 'DONE';
        }
    }
};
