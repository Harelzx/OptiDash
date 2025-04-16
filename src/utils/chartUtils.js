// Function to generate dummy trend data ending with a specific value
export const generateTrendData = (key, endValue, points = 13, variation = 1) => {
    const data = Array(points).fill(null);
    let lastValidValue = typeof endValue === 'number' ? endValue : 0;
    data[points - 1] = { time: 0, [key]: lastValidValue };
    for (let i = points - 2; i >= 0; i--) {
        const change = (Math.random() - 0.45) * variation;
        let newValue = lastValidValue + change;
        if (key === 'accuracy') newValue = Math.min(100, Math.max(95, newValue));
        else if (key === 'faults') newValue = Math.max(0, newValue);
        else newValue = Math.max(0, newValue);
        const formattedValue = key === 'faults' ? Math.round(newValue) : parseFloat((typeof newValue === 'number' ? newValue : 0).toFixed(1));
        data[i] = { time: (points - 1 - i) * 5, [key]: formattedValue };
        lastValidValue = formattedValue;
    }
    return data;
};
