import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { getCurrentRankInfo } from '../utils/helpers'; // Assuming this utility exists and works

const ProfileView = ({ currentUser, gamificationData }) => {
    // Add checks for gamificationData to prevent errors if it's not loaded yet
    const totalPoints = gamificationData?.totalPoints || 0;
    const rank = gamificationData?.rank || '-';
    const leaderboardLength = gamificationData?.leaderboard?.length || 0;
    const tasks = gamificationData?.tasks || [];

    // Ensure getCurrentRankInfo handles potential 0 points correctly
    const rankInfo = getCurrentRankInfo(totalPoints);

    const completedTasks = tasks.filter(task => task.isCompleted);

    return (
        <Card title="User Profile">
            {/* Check if currentUser exists before trying to access properties */}
            {!currentUser ? (
                 <p className="text-gray-500 dark:text-gray-400">Loading user data...</p>
            ) : (
                <div className="space-y-2">
                    {/* **FIXED LINE HERE** */}
                    <p><span className="font-semibold">Name:</span> {currentUser?.name || 'N/A'}</p> 
                    
                    {/* Assuming Role is static or comes from elsewhere */}
                    <p><span className="font-semibold">Role:</span> Production Engineer</p> 
                    
                    <p><span className="font-semibold">Total Points:</span> {totalPoints} pts</p>
                    
                    <div className="flex items-baseline space-x-2">
                        <span className="font-semibold">Rank:</span>
                        <span className="text-lg font-bold dark:text-gray-100">{rank}</span>
                        {leaderboardLength > 0 && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">/ {leaderboardLength}</span>
                        )}
                    </div>
                    
                    {rankInfo && (
                        <p><span className="font-semibold">Title:</span> <span className="font-medium text-indigo-600 dark:text-indigo-400">{rankInfo.title}</span></p>
                    )}

                    {rankInfo && !rankInfo.isMaxRank && (
                        <div className="pt-2">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                                <span>Progress to next title:</span>
                                <span>{rankInfo.currentPointsInRank} / {rankInfo.pointsNeededForLevel} pts</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-indigo-600 dark:bg-indigo-400 h-2 rounded-full"
                                    style={{ width: `${rankInfo.progressPercent}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {rankInfo && rankInfo.isMaxRank && (
                        <p className="text-xs text-yellow-500 dark:text-yellow-400 mt-2">You've reached the highest rank!</p>
                    )}

                    <h4 className="font-semibold pt-4 dark:text-gray-200">Completed Tasks:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                        {completedTasks.map(task => (
                            <li key={task.id}>{task.description} (+{task.points} pts)</li>
                        ))}
                        {completedTasks.length === 0 && (
                            <li className="text-gray-400">No tasks completed yet.</li>
                        )}
                    </ul>
                     <Button variant="secondary" className="mt-6">Edit Profile</Button>
                </div>
           )}
        </Card>
    );
};

export default ProfileView;