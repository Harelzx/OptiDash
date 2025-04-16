import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SensorMonitoring from '../components/dashboard/SensorMonitoring';
import DashboardSummary from '../components/dashboard/DashboardSummary'; // ודא נתיב נכון
import DailyTaskSummary from '../components/dashboard/DailyTaskSummary'; // ודא נתיב נכון
import { generateTrendData } from '../utils/chartUtils'; // ודא נתיב נכון
import { metricConfig } from '../data/initialData'; // ודא נתיב נכון

// העבר את sensorData כ-prop ל-DashboardSummary
const DashboardView = ({ sensorData, alerts, gamificationData, onViewChange }) => {
    const [selectedChartMetric, setSelectedChartMetric] = useState('Temperature');

    // ... (לוגיקת התרשים נשארת זהה) ...
    const currentTrendData = useMemo(() => {
        const key = metricConfig[selectedChartMetric]?.dataKey;
        const endValue = sensorData ? sensorData[key] : undefined;
        if (typeof endValue !== 'number') return [];
        const variation = (metricConfig[selectedChartMetric]?.domainPadding || 1) * 0.5;
        return generateTrendData(key, endValue, 13, variation);
    }, [selectedChartMetric, sensorData]);

    const config = metricConfig[selectedChartMetric];
    const yAxisDomain = config?.domain || (config
        ? [`dataMin - ${config.domainPadding || 1}`, `dataMax + ${config.domainPadding || 1}`]
        : ['auto', 'auto']);


    return (
        <div className="space-y-4 md:space-y-6">
            {/* *** העבר את sensorData ל-DashboardSummary *** */}
            <DashboardSummary
                alerts={alerts}
                onViewChange={onViewChange}
                sensorData={sensorData} // <-- הוספת prop זה
                // status מגיע כברירת מחדל או שצריך להעביר אותו גם?
            />
            <SensorMonitoring data={sensorData} />
            <DailyTaskSummary tasks={gamificationData?.tasks || []} onViewChange={onViewChange} />

             {/* Trend Chart Card - ללא שינוי */}
            <Card title={`${selectedChartMetric} Trend (Last Hour)`}>
                 <div className="flex space-x-2 mb-4 border-b dark:border-gray-700 pb-2 overflow-x-auto">
                    {Object.keys(metricConfig).map((metricName) => (
                        <Button
                            key={metricName}
                            variant={selectedChartMetric === metricName ? 'primary' : 'secondary'}
                            className="text-xs px-3 py-1 flex-shrink-0"
                            onClick={() => setSelectedChartMetric(metricName)}
                        >
                            {metricName}
                        </Button>
                    ))}
                </div>
                 <div className="h-[30vh] min-h-[150px] max-h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={currentTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1}/>
                            <XAxis
                                dataKey="time"
                                type="number"
                                domain={[60, 0]}
                                tickFormatter={(value) => `${value}m`}
                                tick={{ fontSize: 10 }}
                                reversed={true}
                            />
                            <YAxis
                                domain={yAxisDomain}
                                tickFormatter={(value) => typeof value === 'number' ? value.toFixed(config?.allowDecimals === false ? 0 : 1) : value}
                                tick={{ fontSize: 10 }}
                                width={40}
                                allowDecimals={config?.allowDecimals !== false}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', fontSize: '0.75rem', padding: '2px 8px' }}
                                itemStyle={{ color: '#333' }}
                                formatter={(value) => [
                                    `${typeof value === 'number' ? value.toFixed(config?.allowDecimals === false ? 0 : 1) : value}${config?.unit || ''}`,
                                    null
                                ]}
                                labelFormatter={(label) => `${label} min ago`}
                            />
                            <Line
                                type="monotone"
                                dataKey={config?.dataKey || 'temperature'}
                                stroke={config?.color || '#8884d8'}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4 }}
                                connectNulls={true}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};

export default DashboardView;