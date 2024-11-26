import React from 'react';

interface TaskPaginationProps {
    currentPage: number;
    onPageChange: (newPage: number) => void;
}

const TaskPagination: React.FC<TaskPaginationProps> = ({ currentPage, onPageChange }) => {
    return (
        <div>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            <span>{currentPage}</span>
            <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
        </div>
    );
};

export default TaskPagination;
