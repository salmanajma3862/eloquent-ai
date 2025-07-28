import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaCalendarAlt, FaChartLine, FaMicrophone, FaRobot } from 'react-icons/fa';
import { DashboardAudioPlayer } from './DashboardAudioPlayer';

interface Session {
    _id: string;
    topicText: string;
    createdAt: string;
    analysis?: {
        overallBandScore: number;
    };
    status: string;
    audioUrl?: string;
    suggestedAudioUrl?: string;
}

interface SessionCardProps {
    session: Session;
}

const SessionCard: React.FC<SessionCardProps> = React.memo(({ session }) => {
    // Format the date to a readable string
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Get status color and text
    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'completed':
                return { color: 'text-green-400', text: 'Completed', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30' };
            case 'processing':
                return { color: 'text-yellow-400', text: 'Processing', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30' };
            case 'failed':
                return { color: 'text-red-400', text: 'Failed', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30' };
            default:
                return { color: 'text-zinc-400', text: 'Unknown', bgColor: 'bg-zinc-500/20', borderColor: 'border-zinc-500/30' };
        }
    };

    const getBandScoreColor = (score: number) => {
        if (score >= 8) return 'from-emerald-500 to-green-600';
        if (score >= 7) return 'from-blue-500 to-indigo-600';
        if (score >= 6) return 'from-yellow-500 to-orange-600';
        if (score >= 5) return 'from-orange-500 to-red-600';
        return 'from-red-500 to-pink-600';
    };

    const getAudioPlayerColor = (score?: number) => {
        if (!score) return 'bg-blue-600 hover:bg-blue-700';
        if (score >= 8) return 'bg-emerald-600 hover:bg-emerald-700';
        if (score >= 7) return 'bg-blue-600 hover:bg-blue-700';
        if (score >= 6) return 'bg-yellow-600 hover:bg-yellow-700';
        if (score >= 5) return 'bg-orange-600 hover:bg-orange-700';
        return 'bg-red-600 hover:bg-red-700';
    };

    const statusInfo = getStatusInfo(session.status);

    return (
        <Link to={`/analysis/${session._id}`}>
            <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-zinc-700/30 shadow-xl p-6 cursor-pointer max-w-md w-full group relative overflow-hidden">
                {/* No background overlay - completely removed */}

                <div className="relative z-10">
                    {/* Small IELTS label at top */}
                    <div className="flex items-center space-x-1 mb-2">
                        <FaChartLine className="text-blue-400 text-xs" />
                        <span className="text-xs text-zinc-500 font-medium uppercase tracking-wide">IELTS Speaking Test</span>
                    </div>

                    {/* Topic and Score in same row */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0 pr-3">
                            <h3 className="text-lg font-bold text-zinc-100">
                                <span className="block truncate">
                                    {session.topicText}
                                </span>
                            </h3>
                        </div>

                        {/* Score Badge */}
                        {session.analysis?.overallBandScore && (
                            <div className="flex-shrink-0">
                                <div className={`bg-gradient-to-r ${getBandScoreColor(session.analysis.overallBandScore)} text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg flex items-center space-x-1`}>
                                    <FaTrophy className="text-xs" />
                                    <span>{session.analysis.overallBandScore}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Date below */}
                    <div className="flex items-center space-x-2 text-zinc-400 text-sm mb-4">
                        <FaCalendarAlt className="text-xs" />
                        <span>{formatDate(session.createdAt)}</span>
                    </div>

                    {/* Audio Players and Status */}
                    {session.status === 'completed' && session.audioUrl ? (
                        <div className="space-y-4">
                            {/* Audio Players Section */}
                            <div className="bg-zinc-800/30 rounded-xl p-4 border border-zinc-700/20">
                                <div className="flex items-center justify-between gap-3">
                                    {/* Original Audio */}
                                    <DashboardAudioPlayer
                                        audioUrl={session.audioUrl}
                                        colorClass={getAudioPlayerColor(session.analysis?.overallBandScore)}
                                        label="Your Speech"
                                        icon={<FaMicrophone className="text-xs text-zinc-400" />}
                                    />

                                    {/* Suggested Audio (if available) */}
                                    {session.suggestedAudioUrl && (
                                        <DashboardAudioPlayer
                                            audioUrl={session.suggestedAudioUrl}
                                            colorClass="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                                            label="AI Suggested"
                                            icon={<FaRobot className="text-xs text-zinc-400" />}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* View Analysis Link */}
                            <div className="flex justify-end">
                                <div className="text-blue-400 text-sm font-semibold flex items-center space-x-1">
                                    <span>View Analysis</span>
                                    <span className="text-xs">→</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            {/* Status indicator for non-completed sessions */}
                            <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${statusInfo.bgColor} border ${statusInfo.borderColor}`}>
                                <div className={`w-2 h-2 rounded-full ${
                                    session.status === 'processing' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
                                }`}></div>
                                <span className={`text-sm font-medium ${statusInfo.color}`}>
                                    {statusInfo.text}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}, (prevProps, nextProps) => {
    // Only re-render if session ID or status changes
    return prevProps.session._id === nextProps.session._id &&
           prevProps.session.status === nextProps.session.status &&
           prevProps.session.analysis?.overallBandScore === nextProps.session.analysis?.overallBandScore;
});

export default SessionCard;
