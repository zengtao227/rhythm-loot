import { rarityConfig, badges, themes } from '../../themes/themeConfig';
import AvatarViewer from './AvatarViewer';

/**
 * Inventory gallery to display collected items and avatar
 */
export function InventoryGallery({
    inventory,
    theme,
    earnedBadges,
    equippedItems,
    toggleEquip,
    onClose
}) {
    // Group items by rarity for display
    const groupedItems = {
        legendary: [],
        epic: [],
        rare: [],
        uncommon: [],
        common: [],
    };

    inventory.forEach(item => {
        if (groupedItems[item.rarity]) {
            groupedItems[item.rarity].push(item);
        }
    });

    const totalItems = inventory.length;

    // Define Avatar Base
    const avatarBase = theme === 'blink' ? '💃' : '🦸';
    const avatarColor = theme === 'blink' ? '#ff2d7f' : '#00d4ff';

    // Slots definition for the doll
    const slots = ['head', 'neck', 'body', 'back', 'hand', 'misc'];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={e => e.stopPropagation()}
                style={{
                    maxWidth: '900px', // Wider implementation
                    width: '95vw',
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '90vh',
                    overflow: 'hidden'
                }}
            >
                {/* Header */}
                <div className="flex-between mb-lg">
                    <h2 style={{
                        color: avatarColor,
                        fontSize: '1.5rem',
                    }}>
                        🎽 Dressing Room
                    </h2>
                    <span className="text-muted">{totalItems} items collected</span>
                </div>

                <div style={{ display: 'flex', flex: 1, gap: '2rem', overflow: 'hidden', flexDirection: 'row' }}>

                    {/* LEFT PANEL: AVATAR PREVIEW */}
                    <div style={{
                        flex: '0 0 300px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <AvatarViewer
                            theme={themes[theme]} // Simplified: map 'blink'|'quest'|'fortnite' directly to theme object
                            equippedItems={equippedItems}
                        />

                        {/* Equipped Slots Summary */}
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
                            {slots.map(slot => (
                                <div key={slot} style={{
                                    width: '30px',
                                    height: '30px',
                                    background: equippedItems?.[slot] ? `${avatarColor}40` : 'rgba(255,255,255,0.1)',
                                    border: `1px solid ${equippedItems?.[slot] ? avatarColor : 'rgba(255,255,255,0.2)'}`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem',
                                    cursor: 'help'
                                }} title={slot}>
                                    {equippedItems?.[slot] ? '✓' : ''}
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* RIGHT PANEL: INVENTORY GRID */}
                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>

                        {/* Badges Section */}
                        {earnedBadges && earnedBadges.length > 0 && (
                            <div style={{ marginBottom: '2rem' }}>
                                <div className="flex-between mb-sm" style={{
                                    fontSize: '0.85rem',
                                    fontFamily: 'var(--font-display)',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: '#e5e7eb'
                                }}>
                                    <span>Badges & Honors</span>
                                    <span style={{ opacity: 0.7 }}>{earnedBadges.length} / 4</span>
                                </div>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: '1rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    padding: '1rem',
                                    borderRadius: '1rem'
                                }}>
                                    {Object.values(badges).map(badge => {
                                        const isUnlocked = earnedBadges.includes(badge.id);
                                        return (
                                            <div key={badge.id} style={{
                                                textAlign: 'center',
                                                opacity: isUnlocked ? 1 : 0.3,
                                                filter: isUnlocked ? 'none' : 'grayscale(100%)'
                                            }}>
                                                <div style={{
                                                    fontSize: '1.5rem',
                                                    background: isUnlocked ? `${badge.color}20` : 'transparent',
                                                    width: '2.5rem',
                                                    height: '2.5rem',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    margin: '0 auto 0.5rem',
                                                    border: `2px solid ${badge.color}`,
                                                    boxShadow: isUnlocked ? `0 0 10px ${badge.color}40` : 'none'
                                                }}>
                                                    {badge.icon}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Items by Rarity */}
                        {totalItems === 0 ? (
                            <div className="text-center" style={{ padding: '3rem 0' }}>
                                <p className="text-muted">Start practicing to find gear!</p>
                            </div>
                        ) : (
                            ['legendary', 'epic', 'rare', 'uncommon', 'common'].map(rarity => {
                                const items = groupedItems[rarity];
                                if (items.length === 0) return null;

                                return (
                                    <div key={rarity} style={{ marginBottom: '1.5rem' }}>
                                        <div className="flex-between mb-sm" style={{
                                            color: rarityConfig[rarity].color,
                                            fontSize: '0.85rem',
                                            fontFamily: 'var(--font-display)',
                                            letterSpacing: '0.1em',
                                            textTransform: 'uppercase',
                                        }}>
                                            <span>{rarityConfig[rarity].name}</span>
                                        </div>

                                        <div className="inventory-grid">
                                            {items.map((item, idx) => {
                                                const isEquipped = equippedItems?.[item.slot]?.id === item.id;
                                                const canEquip = !!item.slot;

                                                return (
                                                    <div
                                                        key={`${item.id}-${idx}`}
                                                        className={`inventory-item rarity-${item.rarity}`}
                                                        title={canEquip ? `Click to ${isEquipped ? 'unequip' : 'equip'}` : item.name}
                                                        onClick={() => canEquip && toggleEquip(item)}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            padding: '4px',
                                                            overflow: 'hidden',
                                                            cursor: canEquip ? 'pointer' : 'default',
                                                            border: isEquipped ? `2px solid ${avatarColor}` : '',
                                                            boxShadow: isEquipped ? `0 0 10px ${avatarColor}` : '',
                                                            position: 'relative'
                                                        }}
                                                    >
                                                        {item.image ? (
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                            />
                                                        ) : (
                                                            <span style={{ fontSize: '2rem' }}>{item.emoji}</span>
                                                        )}

                                                        {isEquipped && <div style={{
                                                            position: 'absolute',
                                                            top: '2px',
                                                            right: '2px',
                                                            width: '10px',
                                                            height: '10px',
                                                            background: avatarColor,
                                                            borderRadius: '50%'
                                                        }} />}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Close Button */}
                <div className="text-center mt-lg">
                    <button
                        className="btn btn-outline"
                        onClick={onClose}
                    >
                        Close Dressing Room
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InventoryGallery;
