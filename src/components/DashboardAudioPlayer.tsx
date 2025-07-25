import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

interface DashboardAudioPlayerProps {
    audioUrl: string;
    colorClass?: string;
    label?: string;
    icon?: React.ReactNode;
}

export const DashboardAudioPlayer: React.FC<DashboardAudioPlayerProps> = ({
    audioUrl,
    colorClass = "bg-blue-600 hover:bg-blue-700",
    label,
    icon
}) => {
    const audioRef = useRef(new Audio(audioUrl));
    const [isPlaying, setIsPlaying] = useState(false);

    // This effect will pause this player if another one starts playing.
    useEffect(() => {
        const handlePlay = (e: Event) => {
            if (e.target !== audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        };
        document.addEventListener('play', handlePlay, true);

        // When the audio finishes playing, reset the icon to 'Play'
        audioRef.current.onended = () => setIsPlaying(false);

        return () => {
            document.removeEventListener('play', handlePlay, true);
            // Stop audio when component unmounts (page changes)
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        };
    }, []);

    const togglePlayPause = (e: React.MouseEvent) => {
        // Prevent the click from bubbling up to the parent Link
        e.preventDefault();
        e.stopPropagation();

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="flex flex-col items-center space-y-1">
            <button
                onClick={togglePlayPause}
                className={`text-white ${colorClass} p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg`}
                aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            >
                {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
            </button>
            {label && (
                <div className="flex items-center space-x-1">
                    {icon}
                    <span className="text-xs text-zinc-400 font-medium text-center">{label}</span>
                </div>
            )}
        </div>
    );
};
