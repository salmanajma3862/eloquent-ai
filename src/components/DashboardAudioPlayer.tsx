import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

interface DashboardAudioPlayerProps {
    audioUrl: string;
}

export const DashboardAudioPlayer: React.FC<DashboardAudioPlayerProps> = ({ audioUrl }) => {
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
        <button
            onClick={togglePlayPause}
            className="text-white bg-blue-600 hover:bg-blue-700 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
        </button>
    );
};
