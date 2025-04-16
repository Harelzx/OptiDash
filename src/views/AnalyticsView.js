import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../components/ui/Card';
import { weeklyOeeData, faultTypeData } from '../data/initialData';

const AnalyticsView = () => (
    <div className="space-y-4 md:space-y-6">
        <Card title="Advanced Analytics - Faults by Type (Last 30 Days)">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Distribution of recorded faults based on their category.
            </p>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart 
                        data={faultTypeData} 
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                        <YAxis allowDecimals={false} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', fontSize: '0.875rem' }} 
                            itemStyle={{ color: '#333' }} 
                        />
                        <Bar dataKey="count" name="Fault Count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
        
        <Card title="Statistical Analysis - Weekly OEE Trend">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Overall Equipment Effectiveness trend over the past week compared to target.
            </p>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart 
                        data={weeklyOeeData} 
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2}/>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }}/>
                        <YAxis domain={['dataMin - 2', 'dataMax + 2']} tickFormatter={(value) => `${value.toFixed(1)}%`} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem', fontSize: '0.875rem' }} 
                            itemStyle={{ color: '#333' }} 
                            formatter={(value) => `${value.toFixed(1)}%`} 
                        />
                        <Legend verticalAlign="top" height={36}/>
                        <Line 
                            type="monotone" 
                            dataKey="oee" 
                            name="Actual OEE" 
                            stroke="#82ca9d" 
                            strokeWidth={2} 
                            activeDot={{ r: 8 }} 
                            dot={{ r: 4 }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="target" 
                            name="Target OEE" 
                            stroke="#8884d8" 
                            strokeDasharray="5 5" 
                            strokeWidth={2} 
                            dot={false} 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    </div>
);

export default AnalyticsView;
