import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import { testApi, transcribeAudioFile } from '../lib/api';

interface Topic {
    topic: string;
    topicNumber: number;
    totalTopics: number;
}

const TestPage: React.FC = () => {
    const navigate = useNavigate();
    const { token } = useUserStore();

    // State management
    const [topic, setTopic] = useState<string>('');
    const [transcript, setTranscript] = useState<string>('');
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(120); // 2 minutes
    const [status, setStatus] = useState<string>('Loading Topic...');

    // Refs for media handling
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const startTimeRef = useRef<number>(0);

    // Load topic on component mount
    useEffect(() => {
        const loadTopic = async () => {
            try {
                if (!token) {
                    navigate('/login');
                    return;
                }

                const topicData: Topic = await testApi.getTestTopic(token);
                setTopic(topicData.topic);
                setStatus('Ready to Record');
            } catch (error) {
                console.error('Error loading topic:', error);
                setStatus('Error loading topic. Please try again.');
            }
        };

        loadTopic();
    }, [token, navigate]);

    // Timer countdown effect
    useEffect(() => {
        if (isRecording && timer > 0) {
            timerRef.current = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (isRecording && timer === 0) {
            handleStopRecording();
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isRecording, timer]);

    // Format timer display
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Start recording function
    const handleStartRecording = async () => {
        try {
            // Reset state
            setTranscript('');

            if (!token) {
                setStatus('Authentication required');
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            if (timer !== 120) {
                setTimer(120); // Reset timer if it was modified
            }

            setStatus('Requesting microphone access...');

            try {
                // Request microphone access with timeout
                const stream = await Promise.race([
                    navigator.mediaDevices.getUserMedia({
                        audio: {
                            echoCancellation: true,
                            noiseSuppression: true,
                            sampleRate: 16000
                        }
                    }),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Microphone access timeout')), 5000)
                    )
                ]) as MediaStream;

                console.log("MediaStream received:", stream);
                const audioTracks = stream.getAudioTracks();
                console.log("Audio Tracks:", audioTracks);
                if (audioTracks.length === 0) {
                    alert("Error: No audio tracks found in the stream. Please check your microphone.");
                    return;
                }
                console.log("Using audio track:", audioTracks[0].label);

                const audioTrack = stream.getAudioTracks()[0];
                if (audioTrack.muted) {
                    alert("CRITICAL ERROR: Your microphone is muted. Please unmute it in your system or browser settings and try again.");
                    return;
                }

                // Record the start time for duration calculation
                startTimeRef.current = Date.now();

                streamRef.current = stream;
            } catch (micError) {
                const errorMessage = micError.name === 'NotAllowedError'
                    ? 'Microphone access denied. Please enable microphone access in your browser settings.'
                    : micError.message?.includes('timeout')
                        ? 'Microphone access timed out. Please try again.'
                        : 'Error accessing microphone. Please check your device settings.';

                setStatus(errorMessage);
                return;
            }

            // Initialize MediaRecorder
            const stream = streamRef.current;
            if (!stream) {
                throw new Error('Stream not initialized');
            }

            const options = { mimeType: 'audio/webm;codecs=opus' };
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorderRef.current = mediaRecorder;

            // Handle audio data - just collect chunks for batch processing
            mediaRecorder.ondataavailable = (event) => {
                console.log(`Audio data received: ${event.data.size} bytes`);
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                } else {
                    console.warn('Received empty audio data chunk');
                }
            };

            // Handle recording stop
            mediaRecorder.onstop = async () => {
                await handleRecordingComplete();
            };

            // Start recording
            console.log('Starting MediaRecorder with mimeType:', options.mimeType);
            mediaRecorder.start(500); // Send data every 500ms
            console.log('MediaRecorder started successfully');
            setIsRecording(true);
            setStatus('Recording... Speak clearly!');
            audioChunksRef.current = []; // Clear previous chunks

        } catch (error) {
            console.error('Error starting recording:', error);
            setStatus('Error starting recording. Please check microphone permissions.');
        }
    };

    // Stop recording function
    const handleStopRecording = () => {
        setIsRecording(false);
        setStatus('Stopping recording...');

        // Clear timer first to prevent any further countdown
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        // Clean up all resources in try-catch blocks to ensure everything gets cleaned up
        try {
            // Stop media recorder if it's active
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                try {
                    mediaRecorderRef.current.stop();
                } catch (err) {
                    console.error('Error stopping media recorder:', err);
                }
            }
        } finally {
            // Clean up media recorder
            mediaRecorderRef.current = null;
        }

        try {
            // Stop all media tracks
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => {
                    try {
                        track.stop();
                    } catch (err) {
                        console.error('Error stopping media track:', err);
                    }
                });
            }
        } finally {
            // Clean up stream reference
            streamRef.current = null;
        }
    };

    // Handle recording completion and upload
    const handleRecordingComplete = async () => {
        try {
            setStatus('Processing recording...');

            if (!token) {
                setStatus('Authentication required. Please log in again.');
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            // Create audio blob
            console.log(`Creating audio blob from ${audioChunksRef.current.length} chunks`);
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' });
            console.log(`Audio blob created: ${audioBlob.size} bytes`);

            if (audioBlob.size === 0) {
                console.error('Audio blob is empty - no audio was recorded');
                setStatus('No audio recorded. Please check your microphone and try again.');
                return;
            }

            if (audioBlob.size < 1024) { // Less than 1KB
                setStatus('Recording too short. Please speak for at least a few seconds.');
                return;
            }

            setStatus("Finalizing and uploading...");

            try {
                // --- NEW: Calculate Duration ---
                const endTime = Date.now();
                const duration = Math.round((endTime - startTimeRef.current) / 1000);

                // --- NEW: Build Comprehensive FormData ---
                const formData = new FormData();
                formData.append('audio', audioBlob, 'ielts-test.webm');
                formData.append('topicText', topic); // Add the topic text
                formData.append('durationInSeconds', duration.toString()); // Add the duration

                // --- MODIFIED: Call the single endpoint ---
                // The transcribeAudioFile function now handles everything.
                const response = await transcribeAudioFile(token, formData);

                // --- NEW: Handle the new response ---
                // The backend now returns only the new session's ID.
                const newSessionId = response.data.sessionId;

                setStatus("Session saved!");
                navigate(`/analysis/${newSessionId}`); // Navigate directly with the new ID

            } catch (error) {
                console.error("Error completing recording:", error);
                // NEW: Check for the specific 403 Forbidden error
                if (error.response && error.response.status === 403) {
                    // This error comes from our gating logic on the backend
                    throw new Error(error.response.data.message || "You have no free tests remaining.");
                } else {
                    throw new Error("An error occurred. Please try again.");
                }
            }

        } catch (error) {
            console.error('Error completing recording:', error);
            setStatus(error.message || 'Error processing recording. Please try again.');

            // Show retry button after error
            const retryButton = document.createElement('button');
            retryButton.className = 'px-6 py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors';
            retryButton.textContent = 'Try Again';
            retryButton.onclick = () => window.location.reload();
            document.querySelector('[data-status]')?.appendChild(retryButton);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2,
            }
        }
    } as const;

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut" as const
            }
        }
    } as const;

    return (
        <div className="min-h-screen bg-black">
            {/* Navigation */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-700/50 shadow-lg"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent">
                                Eloquent AI
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/dashboard')}
                                disabled={isRecording}
                                className="px-4 py-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
                            >
                                Back to Dashboard
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
                {/* Topic Card */}
                <motion.div
                    variants={itemVariants}
                    className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-bold text-zinc-100 mb-4">Speaking Topic</h2>
                    <div className="bg-zinc-800/30 rounded-xl p-6">
                        <p className="text-lg text-zinc-200 leading-relaxed">
                            {topic || 'Loading topic...'}
                        </p>
                    </div>
                </motion.div>

                {/* Timer and Controls */}
                <motion.div
                    variants={itemVariants}
                    className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-xl p-8 mb-8 text-center"
                >
                    {/* Timer Display */}
                    <div className="mb-6">
                        <div className={`text-6xl font-bold mb-2 ${
                            timer <= 30 ? 'text-red-400' : 'text-blue-400'
                        }`}>
                            {formatTime(timer)}
                        </div>
                        <p className="text-zinc-400">Time remaining</p>
                    </div>

                    {/* Status */}
                    <div className="mb-6">
                        <p className="text-lg text-zinc-300">{status}</p>
                    </div>

                    {/* Record Button */}
                    <motion.button
                        whileHover={{ scale: isRecording ? 1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={isRecording ? handleStopRecording : handleStartRecording}
                        disabled={!topic || status.includes('Error') || status.includes('Processing') || status.includes('Uploading') || status.includes('Saving')}
                        className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                            isRecording
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-600 disabled:opacity-50'
                        }`}
                    >
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </motion.button>
                </motion.div>

                {/* Transcript Display */}
                <motion.div
                    variants={itemVariants}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-xl p-8"
                >
                    <h3 className="text-xl font-bold text-white mb-4">Transcript</h3>
                    <div className="bg-slate-700/30 rounded-xl p-6 min-h-[200px]">
                        <p className="text-slate-200 leading-relaxed">
                            {transcript || (isRecording ? 'Recording in progress... Your transcript will appear here after processing.' : 'Your transcript will appear here after recording and processing.')}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default TestPage;
