import React from 'react';

const AvatarViewer = ({ theme, equippedItems }) => {
    // Slot configurations - Pixel-perfect positioning for the new SVG base
    const slots = {
        head: { top: '8%', left: '50%', transform: 'translateX(-50%)', width: '35%', zIndex: 10 },
        neck: { top: '24%', left: '50%', transform: 'translateX(-50%)', width: '25%', zIndex: 9 },
        body: { top: '35%', left: '50%', transform: 'translateX(-50%)', width: '45%', zIndex: 5 },
        back: { top: '25%', left: '50%', transform: 'translateX(-50%)', width: '75%', zIndex: 1 },
        hand: { top: '48%', right: '5%', width: '30%', zIndex: 8 },
        misc: { bottom: '15%', left: '10%', width: '20%', zIndex: 12 },
    };

    const isBlink = theme.id === 'blink';
    const primaryColor = theme.colors.primary;

    return (
        <div className="avatar-preview-container" style={{
            position: 'relative',
            width: '280px',
            height: '420px',
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: `1px solid ${primaryColor}44`
        }}>
            {/* Ambient Background Glow */}
            <div style={{
                position: 'absolute',
                width: '150%',
                height: '150%',
                background: `radial-gradient(circle at 50% 50%, ${primaryColor}11 0%, transparent 60%)`,
                animation: 'pulse 4s ease-in-out infinite'
            }} />

            {/* Premium Character Base - SVG Silhouette */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
            }}>
                <svg viewBox="0 0 200 300" style={{ width: '180px', height: 'auto', filter: `drop-shadow(0 0 10px ${primaryColor}33)` }}>
                    {/* Character Body Shape */}
                    <path
                        d="M100 40 C115 40 128 53 128 68 C128 83 115 96 100 96 C85 96 72 83 72 68 C72 53 85 40 100 40 Z M80 100 C60 100 50 120 50 145 C50 170 55 240 65 240 C75 240 85 190 100 190 C115 190 125 240 135 240 C145 240 150 170 150 145 C150 120 140 100 120 100 Z"
                        fill="#1a1a25"
                        stroke={primaryColor}
                        strokeWidth="1"
                        opacity="0.8"
                    />
                    {/* Internal glow line */}
                    <path
                        d="M100 110 L100 170 M85 130 L115 130"
                        stroke={`${primaryColor}44`}
                        strokeWidth="0.5"
                    />
                </svg>

                {/* Equipment Layers */}
                {Object.entries(equippedItems).map(([slot, item]) => {
                    const style = slots[slot];
                    if (!style || (!item?.image && !item?.emoji)) return null;

                    return (
                        <div
                            key={slot}
                            style={{
                                position: 'absolute',
                                ...style,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                animation: 'float 6s ease-in-out infinite'
                            }}
                        >
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        filter: `drop-shadow(0 0 15px ${primaryColor}66)`,
                                        objectFit: 'contain'
                                    }}
                                    onError={(e) => {
                                        // Auto fallback to emoji if image fails
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = `<span style="font-size: 2.5rem">${item.emoji}</span>`;
                                    }}
                                />
                            ) : (
                                <span style={{ fontSize: '2.5rem', filter: `drop-shadow(0 0 10px ${primaryColor})` }}>
                                    {item.emoji}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Platform Base */}
            <div style={{
                position: 'absolute',
                bottom: '-20px',
                width: '160px',
                height: '60px',
                background: `radial-gradient(ellipse at center, ${primaryColor}44 0%, transparent 70%)`,
                borderRadius: '50%',
                transform: 'perspective(500px) rotateX(60deg)',
                zIndex: 1
            }} />
        </div>
    );
};

export default AvatarViewer;
