import { rankTiers } from '../data/initialData';

// --- Helper Function for Rank Titles ---
export const getRankTitle = (points) => {
    if (points <= 100) return "Button Polisher";
    if (points <= 150) return "Cable Untangler";
    if (points <= 200) return "Data Dynamo";
    if (points <= 300) return "Efficiency Expert";
    return "Optimization Overlord";
};

// Get current rank info based on points
export const getCurrentRankInfo = (points) => {
    let currentTier = rankTiers[0];
    let nextTier = rankTiers[1];
    for (let i = 0; i < rankTiers.length; i++) {
        if (points >= rankTiers[i].minPoints) {
            currentTier = rankTiers[i];
            nextTier = (i + 1 < rankTiers.length) ? rankTiers[i + 1] : null;
        } else {
            break;
        }
    }
    const pointsInCurrentRank = points - currentTier.minPoints;
    const pointsForNextRank = nextTier ? nextTier.minPoints - currentTier.minPoints : 0;
    return {
        title: currentTier.title,
        currentPointsInRank: pointsInCurrentRank,
        pointsNeededForLevel: pointsForNextRank,
        progressPercent: (nextTier && pointsForNextRank > 0) ? Math.min(100, Math.round((pointsInCurrentRank / pointsForNextRank) * 100)) : 100,
        isMaxRank: !nextTier
    };
};
