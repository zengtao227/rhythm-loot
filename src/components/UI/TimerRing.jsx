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

            {/* Blink Dual Lightsticks Visual */}
            {theme === 'blink' && (
                <>
                    {/* Left Stick */}
                    <div style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '40px',
                        width: '50px',
                        height: '100px',
                        transformOrigin: 'bottom center',
                        transform: isMetronomeActive
                            ? `rotate(${metronomeBeat % 2 === 0 ? '-45deg' : '-10deg'}) scale(${metronomeBeat === 0 ? 1.2 : 1})`
                            : 'rotate(-20deg)',
                        transition: 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        zIndex: 30,
                        pointerEvents: 'none',
                        filter: `drop-shadow(0 0 ${isMetronomeActive && metronomeBeat === 0 ? '15px' : '5px'} #ff2d7f)`
                    }}>
                        <svg viewBox="0 0 50 100" width="100%" height="100%" overflow="visible">
                            <defs>
                                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>
                            <rect x="22" y="50" width="6" height="40" rx="3" fill="#333" />
                            <path d="M25 55 C 10 45, 10 20, 25 35 C 40 20, 40 45, 25 55" fill="#ff6b9d" stroke="#fff" strokeWidth="2" strokeLinejoin="round" filter="url(#glow)" />
                        </svg>
                    </div>

                    {/* Right Stick */}
                    <div style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '40px',
                        width: '50px',
                        height: '100px',
                        transformOrigin: 'bottom center',
                        transform: isMetronomeActive
                            ? `rotate(${metronomeBeat % 2 === 0 ? '45deg' : '10deg'}) scale(${metronomeBeat === 0 ? 1.2 : 1})`
                            : 'rotate(20deg)',
                        transition: 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        zIndex: 30,
                        pointerEvents: 'none',
                        filter: `drop-shadow(0 0 ${isMetronomeActive && metronomeBeat === 0 ? '15px' : '5px'} #ff2d7f)`
                    }}>
                        <svg viewBox="0 0 50 100" width="100%" height="100%" overflow="visible">
                            <rect x="22" y="50" width="6" height="40" rx="3" fill="#333" />
                            <path d="M25 55 C 10 45, 10 20, 25 35 C 40 20, 40 45, 25 55" fill="#ff6b9d" stroke="#fff" strokeWidth="2" strokeLinejoin="round" filter="url(#glow)" />
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
