import { useMemo, useEffect } from 'react';

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
    // Audit theme string
    const activeTheme = theme?.toString().trim().toLowerCase();

    useEffect(() => {
        console.log(`[TimerRing] Active Theme: "${theme}", Condition: ${activeTheme === 'blink'}`);
    }, [theme, activeTheme]);

    const radius = 80; // Radically shrink for visibility
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
            return metronomeBeat === 0 ? 1.05 : 1.02;
        }
        return 1 + (isActive ? audioLevel * 0.03 : 0);
    }, [isActive, audioLevel, isMetronomeActive, metronomeBeat]);

    const getThemeColor = (t) => {
        if (t === 'blink') return '#ff2d7f';
        if (t === 'fortnite') return '#9d4edd';
        return '#00d4ff'; // quest default
    };

    const themeColor = getThemeColor(activeTheme);

    return (
        <div className="timer-ring-wrapper" style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto' }}>
            <div className="timer-ring" style={{
                width: '100%',
                height: '100%',
                transform: `scale(${pulseScale})`,
                transition: isMetronomeActive ? 'transform 0.05s ease-out' : 'transform 0.1s ease-out',
                border: activeTheme === 'blink' ? '2px solid #ff2d7f' : 'none',
                borderRadius: '50%',
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
                <svg viewBox="0 0 280 280" style={{ zIndex: 10, position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
                    {/* Background ring */}
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

                    {/* Progress ring */}
                    <circle
                        cx="140"
                        cy="140"
                        r={radius}
                        fill="none"
                        stroke={`url(#${activeTheme}Gradient)`}
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

                {/* Blink Dual Lightsticks Visual */}
                {activeTheme === 'blink' && (
                    <div className="dual-lightsticks-container" style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 100,
                        pointerEvents: 'none'
                    }}>
                        {/* Left Stick */}
                        <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '30px',
                            width: '80px',
                            height: '160px',
                            transformOrigin: 'bottom center',
                            transform: isMetronomeActive
                                ? `rotate(${metronomeBeat % 2 === 0 ? '-50deg' : '-5deg'}) scale(${metronomeBeat === 0 ? 1.3 : 1})`
                                : 'rotate(-15deg)',
                            transition: 'transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            filter: `drop-shadow(0 0 20px #ff2d7f)`
                        }}>
                            <svg viewBox="0 0 50 100" width="100%" height="100%" overflow="visible">
                                <rect x="20" y="55" width="10" height="40" rx="4" fill="#111" />
                                <path d="M25 60 C 5 45, 5 15, 25 35 C 45 15, 45 45, 25 60" fill="#ff6b9d" stroke="#fff" strokeWidth="3" />
                                <circle cx="25" cy="35" r="5" fill="#fff" fillOpacity="0.8" />
                            </svg>
                        </div>

                        {/* Right Stick */}
                        <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            right: '30px',
                            width: '80px',
                            height: '160px',
                            transformOrigin: 'bottom center',
                            transform: isMetronomeActive
                                ? `rotate(${metronomeBeat % 2 === 0 ? '50deg' : '5deg'}) scale(${metronomeBeat === 0 ? 1.3 : 1})`
                                : 'rotate(15deg)',
                            transition: 'transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            filter: `drop-shadow(0 0 20px #ff2d7f)`
                        }}>
                            <svg viewBox="0 0 50 100" width="100%" height="100%" overflow="visible">
                                <rect x="20" y="55" width="10" height="40" rx="4" fill="#111" />
                                <path d="M25 60 C 5 45, 5 15, 25 35 C 45 15, 45 45, 25 60" fill="#ff6b9d" stroke="#fff" strokeWidth="3" />
                                <circle cx="25" cy="35" r="5" fill="#fff" fillOpacity="0.8" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Center Content */}
                <div className="timer-center" style={{ zIndex: 20, position: 'relative', textAlign: 'center' }}>
                    <div className={`timer-display ${theme}`} style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                        {formatTime(elapsedTime)}
                    </div>
                    <div className="text-secondary" style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                        / {formatTime(targetTime)}
                    </div>
                    <div className="flex-center gap-sm mt-md" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div className={`status-dot ${isActive ? 'listening' : 'paused'}`} />
                        <span className="text-muted">{isActive ? 'Playing...' : 'Waiting...'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimerRing;
