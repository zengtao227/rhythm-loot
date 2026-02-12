import { useMemo } from 'react';

/**
 * Circular progress timer with gradient stroke
 * Clean version - lightsticks are rendered separately in App.jsx
 */
const TimerCircle = ({
    progress,
    theme,
    elapsedTime,
    targetTime,
    isActive,
    audioLevel,
    isMetronomeActive,
    metronomeBeat
}) => {
    const radius = 100;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const pulseScale = useMemo(() => {
        if (isMetronomeActive) {
            return metronomeBeat === 0 ? 1.05 : 1.02;
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
            transition: isMetronomeActive ? 'transform 0.05s ease-out' : 'transform 0.1s ease-out',
            position: 'relative',
            width: '280px',
            height: '280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
            <svg viewBox="0 0 280 280" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                <circle
                    className="timer-ring-bg"
                    cx="140"
                    cy="140"
                    r={radius}
                    fill="none"
                    stroke="#333"
                    strokeWidth={strokeWidth}
                    style={{
                        stroke: isMetronomeActive && metronomeBeat === 0
                            ? `${themeColor}4D`
                            : ''
                    }}
                />
                <circle
                    className={`timer-ring-progress ${theme}`}
                    cx="140"
                    cy="140"
                    r={radius}
                    fill="none"
                    stroke={`url(#${theme}Gradient)`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{
                        filter: isMetronomeActive
                            ? `drop-shadow(0 0 ${metronomeBeat === 0 ? '15px' : '5px'} ${themeColor})`
                            : ''
                    }}
                />
            </svg>

            {/* Center Content */}
            <div className="timer-center" style={{ zIndex: 10, textAlign: 'center' }}>
                <div className={`timer-display ${theme}`} style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>
                    {formatTime(elapsedTime)}
                </div>
                <div className="text-secondary" style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#888' }}>
                    / {formatTime(targetTime)}
                </div>
                <div
                    className="flex-center gap-sm mt-md"
                    style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}
                >
                    <div className={`status-dot ${isActive ? 'listening' : 'paused'}`} />
                    <span className="text-muted" style={{ color: '#888' }}>
                        {isActive ? 'Playing...' : 'Waiting...'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TimerCircle;
