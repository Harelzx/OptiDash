import React from 'react';
import Button from '../ui/Button';
import { getCurrentRankInfo } from '../../utils/helpers'; // Assuming this utility exists

const Gamification = ({ tasks = [], totalPoints = 0, rank = '-', leaderboard = [], onCompleteTask, feedbackMessage }) => {
    // Ensure getCurrentRankInfo handles potential undefined/0 points correctly
    const rankInfo = getCurrentRankInfo(totalPoints);

    return (
        <div className="flex flex-col">
            {/* Total Points Section */}
            <div className="mb-4 flex-shrink-0">
                <h4 className="font-semibold text-gray-600 dark:text-gray-400">Total Points:</h4>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{totalPoints} pts</p>
                {feedbackMessage && (
                    <div className="mt-2 p-2 text-sm text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-200 rounded-md transition-opacity duration-500 ease-in-out">
                        {feedbackMessage}
                    </div>
                )}
            </div>

            {/* Daily Tasks Section */}
            {/* Added null check for tasks */}
            <div className="mb-4 overflow-y-auto pl-2 flex-shrink-0 max-h-60 border-t border-b border-gray-200 dark:border-gray-700 py-3">
                <h4 className="font-semibold text-gray-600 dark:text-gray-400 mb-2">Daily Tasks:</h4>
                {!tasks || tasks.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No tasks for today.</p>
                ) : (
                    <ul className="space-y-2">
                        {tasks.map(task => (
                            <li
                                key={task.id}
                                className={`p-3 rounded-lg border transition-colors duration-150 ease-in-out ${
                                    task.isCompleted
                                        ? 'bg-green-50 border-green-200 dark:bg-green-900/50 dark:border-green-700 opacity-70'
                                        : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3 mr-2 overflow-hidden"> {/* Added overflow-hidden */}
                                        <span className="text-lg flex-shrink-0">{task.icon || '🎯'}</span>
                                        <div className="flex-grow overflow-hidden"> {/* Added overflow-hidden */}
                                            <p className={`text-sm font-medium truncate ${ /* Added truncate */
                                                task.isCompleted
                                                    ? 'line-through text-gray-500 dark:text-gray-400'
                                                    : 'text-gray-800 dark:text-gray-200'
                                            }`}>{task.description}</p>
                                            <span className="text-xs text-blue-600 font-medium dark:text-blue-400">{task.points} pts</span>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 ml-2">
                                        {!task.isCompleted && (
                                            <Button
                                                onClick={() => onCompleteTask(task.id)}
                                                variant="success"
                                                // **MODIFIED: Increased padding for mobile tap target**
                                                className="text-xs px-3 py-1.5 sm:px-2 sm:py-1"
                                                // Alternative simpler padding: className="text-xs px-3 py-1.5"
                                            >
                                                Complete
                                            </Button>
                                        )}
                                        {task.isCompleted && (
                                            <span className="text-xs text-green-600 dark:text-green-400 font-semibold">Completed ✔</span>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Your Status Section */}
            {rankInfo && ( // Added check for rankInfo
                <div className="mb-4 flex-shrink-0">
                    <h4 className="font-semibold text-gray-600 dark:text-gray-400 mb-1">Your Status:</h4>
                    <div className="flex items-baseline space-x-2 mb-1 flex-wrap"> {/* Added flex-wrap */}
                        <span className="text-xl font-bold dark:text-gray-100">{rank}</span>
                        {leaderboard && leaderboard.length > 0 && (
                             <span className="text-sm text-gray-500 dark:text-gray-400">/ {leaderboard.length}</span>
                        )}
                        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">- {rankInfo.title}</span>
                    </div>

                    {!rankInfo.isMaxRank && (
                        <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                                <span>Progress to next title:</span>
                                <span>{rankInfo.currentPointsInRank} / {rankInfo.pointsNeededForLevel} pts</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-indigo-600 dark:bg-indigo-400 h-2 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${rankInfo.progressPercent}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {rankInfo.isMaxRank && (
                        <p className="text-xs text-yellow-500 dark:text-yellow-400 mt-2">You've reached the highest rank!</p>
                    )}

                    <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-2">Keep pushing for the top spot!</p>
                </div>
            )}

            {/* Leaderboard Section */}
            {/* Added null check for leaderboard */}
            <div className="overflow-y-auto mb-4 pl-2 border-t border-gray-200 dark:border-gray-700 pt-3">
                <h4 className="font-semibold text-gray-600 dark:text-gray-400 mb-2">Leaderboard:</h4>
                {!leaderboard || leaderboard.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Leaderboard is empty.</p>
                ) : (
                    <ul className="space-y-1 text-sm">
                        {leaderboard.map((user, index) => (
                            <li key={index} className={`flex justify-between p-1 rounded ${user.name === "You" ? 'bg-blue-50 dark:bg-blue-900/50' : ''}`}>
                                <span className="dark:text-gray-300 truncate mr-2">{index + 1}. {user.name}</span> {/* Added truncate */}
                                <span className="font-medium dark:text-gray-300 flex-shrink-0">{user.points} pts</span> {/* Added flex-shrink-0 */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* View Full Leaderboard Button */}
            <div className="mt-auto pt-4 flex-shrink-0 border-t border-gray-200 dark:border-gray-700">
                <Button onClick={() => console.log("View full leaderboard")} variant="secondary" className="w-full">
                    View Full Leaderboard
                </Button>
            </div>
        </div>
    );
};

export default Gamification;