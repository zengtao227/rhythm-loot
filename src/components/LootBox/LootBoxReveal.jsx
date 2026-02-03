import { useState, useEffect } from 'react';
import { rarityConfig } from '../../themes/themeConfig';

/**
 * Loot box opening animation and reward reveal
 */
export function LootBoxReveal({ reward, theme, onClose, streakBonus }) {
    const [phase, setPhase] = useState('box'); // 'box', 'opening', 'reveal'
    const [shaking, setShaking] = useState(false);

    const rarityInfo = rarityConfig[reward.rarity];
    const isLegendary = reward.rarity === 'legendary';

    const handleBoxClick = () => {
        if (phase !== 'box') return;

        setShaking(true);

        // Shake animation
        setTimeout(() => {
            setShaking(false);
            setPhase('opening');
        }, 600);

        // Reveal after opening animation
        setTimeout(() => {
            setPhase('reveal');

            // Screen shake for legendary
            if (isLegendary) {
                document.body.classList.add('screen-shake');
                setTimeout(() => {
                    document.body.classList.remove('screen-shake');
                }, 500);
            }
        }, 1200);
    };

    // Auto-close prevented - user must click

    return (
        <div className="modal-overlay" onClick={phase === 'reveal' ? onClose : undefined}>
            <div className="modal-content text-center" onClick={e => e.stopPropagation()}>

                {/* Streak Bonus Notice */}
                {streakBonus && (
                    <div
                        className="streak-badge active mb-lg"
                        style={{ display: 'inline-flex' }}
                    >
                        🔥 {streakBonus.description}
                    </div>
                )}

                {/* Box Phase */}
                {phase === 'box' && (
                    <div
                        className={`loot-box ${shaking ? '' : ''}`}
                        onClick={handleBoxClick}
                        style={{
                            animation: shaking ? 'shake 0.1s ease-in-out infinite' : 'float 3s ease-in-out infinite',
                        }}
                    >
                        <div style={{
                            fontSize: '8rem',
                            filter: `drop-shadow(0 0 30px ${theme === 'blink' ? 'rgba(255, 45, 127, 0.6)' : 'rgba(0, 212, 255, 0.6)'})`,
                        }}>
                            {theme === 'blink' ? '🎁' : '📦'}
                        </div>
                    </div>
                )}

                {/* Opening Phase */}
                {phase === 'opening' && (
                    <div style={{
                        fontSize: '8rem',
                        animation: 'revealBurst 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}>
                        ✨
                    </div>
                )}

                {/* Reveal Phase */}
                {phase === 'reveal' && (
                    <div className="reward-reveal">
                        {/* Rarity Banner */}
                        <div
                            style={{
                                color: rarityInfo.color,
                                fontSize: '0.9rem',
                                fontFamily: 'var(--font-display)',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                marginBottom: '1rem',
                                textShadow: `0 0 20px ${rarityInfo.color}`,
                            }}
                        >
                            {rarityInfo.name}
                        </div>

                        {/* Reward Item */}
                        <div
                            className={`rarity-${reward.rarity}`}
                            style={{
                                width: '12rem',
                                height: '12rem',
                                padding: '1rem',
                                borderRadius: '50%',
                                border: '3px solid',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                background: 'rgba(255, 255, 255, 0.03)',
                                overflow: 'hidden'
                            }}
                        >
                            {reward.image ? (
                                <img
                                    src={reward.image}
                                    alt={reward.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        filter: `drop-shadow(0 0 10px ${rarityInfo.color})`,
                                    }}
                                />
                            ) : (
                                <span style={{ fontSize: '6rem' }}>{reward.emoji}</span>
                            )}
                        </div>

                        {/* Reward Name */}
                        <h2
                            style={{
                                color: rarityInfo.color,
                                fontSize: '1.8rem',
                                marginBottom: '0.5rem',
                                textShadow: `0 0 15px ${rarityInfo.color}`,
                            }}
                        >
                            {reward.name}
                        </h2>

                        {/* Collection Message */}
                        <p className="text-muted mt-md">
                            Added to your collection!
                        </p>

                        {/* Close Button */}
                        <button
                            className={`btn btn-${theme} mt-xl`}
                            onClick={onClose}
                        >
                            Awesome!
                        </button>
                    </div>
                )}

                {/* Tap Instruction */}
                {phase === 'box' && (
                    <p
                        className="text-muted mt-lg"
                        style={{ animation: 'pulse 2s ease-in-out infinite' }}
                    >
                        Tap to open!
                    </p>
                )}
            </div>
        </div>
    );
}

export default LootBoxReveal;
