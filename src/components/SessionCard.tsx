import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
}

interface SessionCardProps {
    session: Session;
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
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
                return { color: 'text-green-400', text: 'Completed' };
            case 'processing':
                return { color: 'text-yellow-400', text: 'Processing' };
            case 'failed':
                return { color: 'text-red-400', text: 'Failed' };
            default:
                return { color: 'text-zinc-400', text: 'Unknown' };
        }
    };

    const statusInfo = getStatusInfo(session.status);

    return (
        <Link to={`/analysis/${session._id}`}>
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl p-6 cursor-pointer transition-all duration-300 hover:border-blue-500/50 max-w-md w-full"
            >
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                        <span className="block truncate">
                            {session.topicText}
                        </span>
                    </h3>
                    <p className="text-zinc-400 text-sm">
                        {formatDate(session.createdAt)}
                    </p>
                </div>
                
                {/* Score Badge */}
                {session.analysis?.overallBandScore && (
                    <div className="ml-4 flex-shrink-0">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {session.analysis.overallBandScore}
                        </div>
                    </div>
                )}
            </div>

            {/* Status and Action */}
            <div className="flex justify-between items-center">
                {/* Audio Player for completed sessions, status indicator for others */}
                {session.status === 'completed' && session.audioUrl ? (
                    <DashboardAudioPlayer audioUrl={session.audioUrl} />
                ) : (
                    <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                            session.status === 'processing' ? 'bg-yellow-400' : 'bg-red-400'
                        }`}></div>
                        <span className={`text-sm ${statusInfo.color}`}>
                            {statusInfo.text}
                        </span>
                    </div>
                )}

                {session.status === 'completed' && (
                    <div className="text-blue-400 text-sm font-medium">
                        View Analysis →
                    </div>
                )}
            </div>
            </motion.div>
        </Link>
    );
};

export default SessionCard;
