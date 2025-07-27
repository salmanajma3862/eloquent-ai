import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Session {
    _id: string;
    topicText: string;
    createdAt: string;
    analysis?: {
        overallBandScore: number;
        wordCount?: number;
        wordsPerMinute?: number;
        fluencyAndCoherence: {
            score: number;
            feedback: string;
        };
        lexicalResource: {
            score: number;
            feedback: string;
        };
        grammaticalRangeAndAccuracy: {
            score: number;
            feedback: string;
        };
        improvedText?: string;
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
                // Individual IELTS criteria scores - now available from backend
                'Fluency': session.analysis?.fluencyAndCoherence.score || 0,
                'Lexical': session.analysis?.lexicalResource.score || 0,
                'Grammar': session.analysis?.grammaticalRangeAndAccuracy.score || 0,
            }));
    }, [sessions]);

    // Don't render if we don't have enough data points
    if (chartData.length < 2) {
        return null;
    }

    return (
        <div className="space-y-8">
            {/* Chart - Free from container constraints */}
            <div className="bg-zinc-800/30 rounded-xl p-6">
                <ResponsiveContainer width="100%" height={400}>
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
                                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                                padding: '12px'
                            }}
                            labelStyle={{ color: '#f4f4f5', fontWeight: 'bold', marginBottom: '8px' }}
                            formatter={(value: any, name: string) => [
                                <span style={{ fontWeight: 'bold' }}>{Number(value).toFixed(1)}</span>,
                                <span style={{
                                    color: name === 'Overall Band Score' ? '#3b82f6' :
                                          name === 'Fluency' ? '#8b5cf6' :
                                          name === 'Lexical' ? '#10b981' : '#f59e0b'
                                }}>{name}</span>
                            ]}
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
                        {/* Additional score lines */}
                        <Line
                            type="monotone"
                            dataKey="Fluency"
                            stroke="#8b5cf6" // Purple for Fluency & Coherence
                            strokeWidth={2}
                            activeDot={{
                                r: 5,
                                fill: '#8b5cf6',
                                stroke: '#7c3aed',
                                strokeWidth: 2
                            }}
                            dot={{
                                r: 3,
                                fill: '#8b5cf6',
                                stroke: '#7c3aed',
                                strokeWidth: 1
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Lexical"
                            stroke="#10b981" // Green for Lexical Resource
                            strokeWidth={2}
                            activeDot={{
                                r: 5,
                                fill: '#10b981',
                                stroke: '#059669',
                                strokeWidth: 2
                            }}
                            dot={{
                                r: 3,
                                fill: '#10b981',
                                stroke: '#059669',
                                strokeWidth: 1
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Grammar"
                            stroke="#f59e0b" // Orange for Grammar
                            strokeWidth={2}
                            activeDot={{
                                r: 5,
                                fill: '#f59e0b',
                                stroke: '#d97706',
                                strokeWidth: 2
                            }}
                            dot={{
                                r: 3,
                                fill: '#f59e0b',
                                stroke: '#d97706',
                                strokeWidth: 1
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Progress Summary */}
            <div className="mt-6 space-y-6">
                {/* Overall Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <div className="text-zinc-400 text-sm">Latest Overall Score</div>
                    </div>
                    <div className="bg-zinc-800/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400">
                            {chartData.length > 1
                                ? (chartData[chartData.length - 1]['Overall Band Score'] - chartData[0]['Overall Band Score'] >= 0 ? '+' : '') +
                                  (chartData[chartData.length - 1]['Overall Band Score'] - chartData[0]['Overall Band Score']).toFixed(1)
                                : 'N/A'
                            }
                        </div>
                        <div className="text-zinc-400 text-sm">Overall Improvement</div>
                    </div>
                </div>

                {/* Individual Score Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-zinc-800/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                            <h4 className="text-zinc-300 font-semibold text-sm">Fluency & Coherence</h4>
                        </div>
                        <div className="text-xl font-bold text-purple-400">
                            {chartData.length > 0 ? chartData[chartData.length - 1]['Fluency'].toFixed(1) : 'N/A'}
                        </div>
                        <div className="text-zinc-500 text-xs mt-1">
                            {chartData.length > 1
                                ? `${chartData[chartData.length - 1]['Fluency'] - chartData[0]['Fluency'] >= 0 ? '+' : ''}${(chartData[chartData.length - 1]['Fluency'] - chartData[0]['Fluency']).toFixed(1)} improvement`
                                : 'Latest score'
                            }
                        </div>
                    </div>
                    <div className="bg-zinc-800/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <h4 className="text-zinc-300 font-semibold text-sm">Lexical Resource</h4>
                        </div>
                        <div className="text-xl font-bold text-green-400">
                            {chartData.length > 0 ? chartData[chartData.length - 1]['Lexical'].toFixed(1) : 'N/A'}
                        </div>
                        <div className="text-zinc-500 text-xs mt-1">
                            {chartData.length > 1
                                ? `${chartData[chartData.length - 1]['Lexical'] - chartData[0]['Lexical'] >= 0 ? '+' : ''}${(chartData[chartData.length - 1]['Lexical'] - chartData[0]['Lexical']).toFixed(1)} improvement`
                                : 'Latest score'
                            }
                        </div>
                    </div>
                    <div className="bg-zinc-800/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                            <h4 className="text-zinc-300 font-semibold text-sm">Grammar & Accuracy</h4>
                        </div>
                        <div className="text-xl font-bold text-orange-400">
                            {chartData.length > 0 ? chartData[chartData.length - 1]['Grammar'].toFixed(1) : 'N/A'}
                        </div>
                        <div className="text-zinc-500 text-xs mt-1">
                            {chartData.length > 1
                                ? `${chartData[chartData.length - 1]['Grammar'] - chartData[0]['Grammar'] >= 0 ? '+' : ''}${(chartData[chartData.length - 1]['Grammar'] - chartData[0]['Grammar']).toFixed(1)} improvement`
                                : 'Latest score'
                            }
                        </div>
                    </div>
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
