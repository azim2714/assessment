/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Task } from '../models/Task';
import { getTasks } from '../services/taskService';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';
import TaskPagination from './TaskPagination';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [statusFilter, setStatusFilter] = useState<'IN PROGRESS' | 'DONE' | 'COMPLETE' | 'ALL'>('ALL');
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const fetchTasks = async () => {
            const allTasks = await getTasks();
            setTasks(allTasks);
            filterTasks(allTasks);
        };
        fetchTasks();
    }, []);

    const filterTasks = (tasks: Task[]) => {
        let filtered = tasks;
        if (statusFilter !== 'ALL') {
            filtered = tasks.filter(task => task.status === statusFilter);
        }
        setFilteredTasks(filtered);
    };

    const handleFilterChange = (status: 'IN PROGRESS' | 'DONE' | 'COMPLETE' | 'ALL') => {
        setStatusFilter(status);
        filterTasks(tasks);
    };

    const handlePaginationChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            <TaskFilter onFilterChange={handleFilterChange} />
            {filteredTasks.slice((page - 1) * 20, page * 20).map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
            <TaskPagination currentPage={page} onPageChange={handlePaginationChange} />
        </div>
    );
};

export default TaskList;