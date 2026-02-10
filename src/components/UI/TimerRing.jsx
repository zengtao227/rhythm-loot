import { useMemo } from 'react';

/**
 * Circular progress timer with gradient stroke
 */
export function TimerRing({
    progress,
    theme,
    elapsedTime,
    targetTime,
    isActive,
    audioLevel,
    isMetronomeActive,
    metronomeBeat
}) {
    const radius = 120;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Pulse effect based on audio OR metronome
    const pulseScale = useMemo(() => {
        if (isMetronomeActive) {
            // Metronome "kick" effect
            // Trigger a sharp meaningful scale up on the beat (beat passing from prop)
            return metronomeBeat === 0 ? 1.05 : 1.02; // Stronger pulse on downbeat
        }
        return 1 + (isActive ? audioLevel * 0.03 : 0);
    }, [isActive, audioLevel, isMetronomeActive, metronomeBeat]);

    const getThemeColor = (t) => {
        if (t === 'blink') return '#ff2d7f';
        if (t === 'fortnite') return '#9d4edd';
        return '#00d4ff'; // quest default
    };

    const themeColor = getThemeColor(theme);

    return (
        <div className="timer-ring" style={{
            transform: `scale(${pulseScale})`,
            transition: isMetronomeActive ? 'transform 0.05s ease-out' : 'transform 0.1s ease-out'
        }}>
            {/* SVG Gradient Definitions */}
            <svg
                viewBox="0 0 280 280"
                style={{ position: 'absolute', width: 0, height: 0 }}
            >
                <defs>
                    <linearGradient id="blinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff2d7f" />
                        <stop offset="50%" stopColor="#ff6b9d" />
                        <stop offset="100%" stopColor="#c71585" />
                    </linearGradient>
                    <linearGradient id="questGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d4ff" />
                        <stop offset="50%" stopColor="#00ffaa" />
                        <stop offset="100%" stopColor="#00c896" />
                    </linearGradient>
                    <linearGradient id="fortniteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9d4edd" />
                        <stop offset="50%" stopColor="#f72585" />
                        <stop offset="100%" stopColor="#4cc9f0" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Timer Ring */}
            <svg viewBox="0 0 280 280">
                {/* Background ring */}
                <circle
                    className="timer-ring-bg"
                    cx="140"
                    cy="140"
                    r={radius}
                    style={{
                        stroke: isMetronomeActive && metronomeBeat === 0
                            ? `${themeColor}4D` // 30% opacity
                            : ''
                    }}
                />

                {/* Progress ring */}
                <circle
                    className={`timer-ring-progress ${theme}`}
                    cx="140"
                    cy="140"
                    r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                        filter: isMetronomeActive
                            ? `drop-shadow(0 0 ${metronomeBeat === 0 ? '15px' : '5px'} ${themeColor})`
                            : ''
                    }}
                />
            </svg>

            {/* Blink Lightstick Metronome Visual */}
            {theme === 'blink' && (
                <>
                    <style>
                        {`
                            @keyframes lightstickIdle {
                                0% { transform: translate(-50%, 0) rotate(5deg) scale(1); filter: drop-shadow(0 0 5px #ff2d7f); }
                                50% { transform: translate(-50%, 0) rotate(5deg) scale(1.05); filter: drop-shadow(0 0 15px #ff2d7f); }
                                100% { transform: translate(-50%, 0) rotate(5deg) scale(1); filter: drop-shadow(0 0 5px #ff2d7f); }
                            }
                        `}
                    </style>
                    <div className="blink-lightstick" style={{
                        position: 'absolute',
                        top: '15%',
                        left: '50%',
                        transformOrigin: 'bottom center',
                        transform: isMetronomeActive
                            ? `translate(-50%, 0) rotate(${metronomeBeat % 2 === 0 ? '-20deg' : '20deg'}) scale(${metronomeBeat === 0 ? 1.3 : 1})`
                            : undefined,
                        animation: isMetronomeActive ? 'none' : 'lightstickIdle 3s ease-in-out infinite',
                        transition: isMetronomeActive ? 'transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
                        zIndex: 20,
                        pointerEvents: 'none',
                        opacity: 1
                    }}>
                        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                            {/* Black Handle */}
                            <rect x="46" y="55" width="8" height="40" rx="3" fill="#111" stroke="#ff2d7f" strokeWidth="1" />
                            {/* Heart Head - Improved Path */}
                            <path d="M50 55 C 20 45, 20 20, 50 35 C 80 20, 80 45, 50 55" fill="#ff6b9d" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
                            {/* Center Glow */}
                            <circle cx="50" cy="35" r="8" fill="#fff" fillOpacity="0.9" />
                            {/* Sparkles */}
                            <circle cx="30" cy="20" r="2" fill="#fff" opacity={isMetronomeActive || isActive ? 1 : 0.5} />
                            <circle cx="70" cy="20" r="2" fill="#fff" opacity={isMetronomeActive || isActive ? 1 : 0.5} />
                        </svg>
                    </div>
                </>
            )}

            {/* Center Content */}
            <div className="timer-center">
                <div className={`timer-display ${theme}`}>
                    {formatTime(elapsedTime)}
                </div>
                <div className="text-secondary" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    / {formatTime(targetTime)}
                </div>
                <div
                    className="flex-center gap-sm mt-md"
                    style={{ fontSize: '0.8rem' }}
                >
                    <div className={`status-dot ${isActive ? 'listening' : 'paused'}`} />
                    <span className="text-muted">
                        {isActive ? 'Playing...' : 'Waiting...'}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TimerRing;
