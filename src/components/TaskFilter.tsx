import React from 'react';

interface TaskFilterProps {
    onFilterChange: (status: 'IN PROGRESS' | 'DONE' | 'COMPLETE' | 'ALL') => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
    return (
        <div>
            <button onClick={() => onFilterChange('ALL')}>All</button>
            <button onClick={() => onFilterChange('IN PROGRESS')}>In Progress</button>
            <button onClick={() => onFilterChange('DONE')}>Done</button>
            <button onClick={() => onFilterChange('COMPLETE')}>Complete</button>
        </div>
    );
};

export default TaskFilter;
