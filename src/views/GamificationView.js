import React from 'react';
import Card from '../components/ui/Card';
import Gamification from '../components/gamification/Gamification';

const GamificationView = ({ gamificationData, onCompleteTask, feedbackMessage }) => (
    <Card title="Optimization Race">
        <Gamification
            tasks={gamificationData.tasks}
            totalPoints={gamificationData.totalPoints}
            rank={gamificationData.rank}
            leaderboard={gamificationData.leaderboard}
            onCompleteTask={onCompleteTask}
            feedbackMessage={feedbackMessage}
        />
    </Card>
);

export default GamificationView;
