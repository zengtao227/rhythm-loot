import { useMemo } from 'react';

/**
 * Audio frequency visualizer bars
 */
export function AudioBars({ frequencyData, theme, isActive }) {
    const barCount = 16;

    const bars = useMemo(() => {
        // We want a symmetric "mountain" shape where the loudest (low freq) 
        // bars are in the middle and it tapers off to the sides.
        const step = 4; // Use first 32 bins (7.5 * 4 = 30) for better range
        const result = [];

        for (let i = 0; i < barCount; i++) {
            // Calculate distance from center (index 7.5 for 16 bars)
            const distanceFromCenter = Math.abs(i - (barCount - 1) / 2);
            // Middle bars (low distance) get low frequency indices (high energy)
            // Edge bars (high distance) get high frequency indices (low energy)
            const freqIndex = Math.floor(distanceFromCenter * step);
            const value = frequencyData[freqIndex] || 0;

            const height = isActive ? Math.max(4, (value / 255) * 60) : 4;
            result.push({
                height,
                delay: distanceFromCenter * 0.04 // Faster spread animation from center
            });
        }

        return result;
    }, [frequencyData, isActive]);

    return (
        <div className="audio-bars">
            {bars.map((bar, i) => (
                <div
                    key={i}
                    className={`audio-bar ${theme}`}
                    style={{
                        height: `${bar.height}px`,
                        animationDelay: `${bar.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}

export default AudioBars;
