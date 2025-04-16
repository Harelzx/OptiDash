import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const DailyTaskSummary = ({ tasks = [], onViewChange }) => {
    const tasksToShow = tasks.slice(0, 3);
    
    return (
        <Card title="Daily Tasks Summary">
            {tasks.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">No daily tasks assigned.</p>
            ) : (
                <div className="flex flex-col">
                    <ul className="space-y-2 mb-3">
                        {tasksToShow.map(task => (
                            <li key={task.id} className="flex items-center justify-between text-sm">
                                <span className={`${task.isCompleted ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                                    {task.isCompleted && '✔ '}
                                    {task.description}
                                </span>
                                <span className={`text-xs font-medium ${task.isCompleted ? 'text-gray-400 dark:text-gray-500' : 'text-blue-600 dark:text-blue-400'}`}>
                                    {task.points} pts
                                </span>
                            </li>
                        ))}
                    </ul>
                    {tasks.length > tasksToShow.length && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                            ... and {tasks.length - tasksToShow.length} more tasks.
                        </div>
                    )}
                    <Button
                        variant="secondary"
                        className="w-full mt-auto text-sm"
                        onClick={() => onViewChange ? onViewChange('Optimization Race') : console.log('onViewChange not provided')}
                    >
                        View All Tasks
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default DailyTaskSummary;
