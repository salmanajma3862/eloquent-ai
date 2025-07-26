import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Session {
    _id: string;
    topicText: string;
    createdAt: string;
    analysis?: {
        overallBandScore: number;
        fluencyAndCoherence?: {
            score: number;
        };
        lexicalResource?: {
            score: number;
        };
        grammaticalRangeAndAccuracy?: {
            score: number;
        };
    };
    status: string;
}

interface ProgressChartProps {
    sessions: Session[];
}

const ProgressChart: React.FC<ProgressChartProps> = React.memo(({ sessions }) => {
    // 1. Memoize the chart data formatting
    const chartData = useMemo(() => {
        return sessions
            // Filter out sessions without analysis scores
            .filter(session => session.analysis?.overallBandScore)
            // Ensure sessions are sorted from oldest to newest for the chart's x-axis
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .map(session => ({
                // Format the date for a clean x-axis label
                date: new Date(session.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                // The score to be plotted on the y-axis
                'Overall Band Score': session.analysis?.overallBandScore || 0,
                // We can also add sub-scores for more detailed charts later!
                'Fluency': session.analysis?.fluencyAndCoherence?.score || 0,
                'Lexical': session.analysis?.lexicalResource?.score || 0,
                'Grammar': session.analysis?.grammaticalRangeAndAccuracy?.score || 0,
            }));
    }, [sessions]);

    // Don't render if we don't have enough data points
    if (chartData.length < 2) {
        return null;
    }

    return (
        <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-8">
            <h3 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <span>Your Progress Over Time</span>
            </h3>
            
            <div className="bg-zinc-800/30 rounded-xl p-4">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" opacity={0.3} />
                        <XAxis 
                            dataKey="date" 
                            stroke="#a1a1aa" 
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis 
                            domain={[0, 9]} 
                            stroke="#a1a1aa" 
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            label={{ 
                                value: 'Band Score', 
                                angle: -90, 
                                position: 'insideLeft',
                                style: { textAnchor: 'middle', fill: '#a1a1aa' }
                            }}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#18181b', 
                                border: '1px solid #4a4a4a',
                                borderRadius: '8px',
                                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
                            }} 
                            labelStyle={{ color: '#f4f4f5' }}
                            itemStyle={{ color: '#3b82f6' }}
                        />
                        <Legend 
                            wrapperStyle={{ color: '#f4f4f5' }}
                            iconType="line"
                        />
                        <Line 
                            type="monotone" 
                            dataKey="Overall Band Score" 
                            stroke="#3b82f6" // Our primary blue accent
                            strokeWidth={3} 
                            activeDot={{ 
                                r: 6, 
                                fill: '#3b82f6',
                                stroke: '#1e40af',
                                strokeWidth: 2
                            }}
                            dot={{ 
                                r: 4, 
                                fill: '#3b82f6',
                                stroke: '#1e40af',
                                strokeWidth: 1
                            }}
                        />
                        {/* We can uncomment these later to show all scores */}
                        {/* <Line type="monotone" dataKey="Fluency" stroke="#8884d8" strokeWidth={2} /> */}
                        {/* <Line type="monotone" dataKey="Lexical" stroke="#82ca9d" strokeWidth={2} /> */}
                        {/* <Line type="monotone" dataKey="Grammar" stroke="#ffc658" strokeWidth={2} /> */}
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
            {/* Progress Summary */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-zinc-800/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">
                        {chartData.length}
                    </div>
                    <div className="text-zinc-400 text-sm">Tests Completed</div>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">
                        {chartData.length > 0 ? chartData[chartData.length - 1]['Overall Band Score'].toFixed(1) : 'N/A'}
                    </div>
                    <div className="text-zinc-400 text-sm">Latest Score</div>
                </div>
                <div className="bg-zinc-800/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">
                        {chartData.length > 1 
                            ? (chartData[chartData.length - 1]['Overall Band Score'] - chartData[0]['Overall Band Score'] >= 0 ? '+' : '') +
                              (chartData[chartData.length - 1]['Overall Band Score'] - chartData[0]['Overall Band Score']).toFixed(1)
                            : 'N/A'
                        }
                    </div>
                    <div className="text-zinc-400 text-sm">Improvement</div>
                </div>
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    // Only re-render if sessions array length or content changes
    if (prevProps.sessions.length !== nextProps.sessions.length) return false;

    // Check if any session analysis scores have changed
    for (let i = 0; i < prevProps.sessions.length; i++) {
        if (prevProps.sessions[i]._id !== nextProps.sessions[i]._id ||
            prevProps.sessions[i].analysis?.overallBandScore !== nextProps.sessions[i].analysis?.overallBandScore) {
            return false;
        }
    }
    return true;
});

export default ProgressChart;
