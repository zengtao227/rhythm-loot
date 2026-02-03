import React from 'react';

const AvatarViewer = ({ theme, equippedItems }) => {
    // Helper to get image URL from an item object
    const getItemImage = (rarity, itemId) => {
        // In a real app, you might look up item details from ID
        // Here we rely on the passed item object having the image URL
        // We need to find the item in the inventory/theme config to get its image
        // BUT, equippedItems from useInventory stores the whole item object usually
        // Let's verify what equippedItems contains in the parent.
        // Assuming equippedItems structure: { head: {id, image, ...}, hand: {...} }
        return null;
    };

    // Slot configurations (Positioning % for Head, Body, Hand, etc.)
    // These are relative to the avatar container
    const slots = {
        head: { top: '5%', left: '50%', transform: 'translateX(-50%)', width: '40%', zIndex: 10 },
        neck: { top: '25%', left: '50%', transform: 'translateX(-50%)', width: '30%', zIndex: 9 },
        body: { top: '35%', left: '50%', transform: 'translateX(-50%)', width: '50%', zIndex: 5 },
        back: { top: '20%', left: '50%', transform: 'translateX(-50%)', width: '70%', zIndex: 1 },
        hand: { top: '45%', right: '0%', width: '35%', zIndex: 8 }, // Held in right hand
        misc: { bottom: '5%', left: '5%', width: '25%', zIndex: 12 }, // Floating pet/item
    };

    return (
        <div className="avatar-container" style={{
            position: 'relative',
            width: '280px',
            height: '400px',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '20px',
            margin: '0 auto',
            overflow: 'hidden',
            border: `2px solid ${theme.colors.primary}`
        }}>
            {/* Background Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                background: theme.colors.primary,
                filter: 'blur(80px)',
                opacity: 0.3,
                zIndex: 0
            }} />

            {/* Base Silhouette (CSS Art for now) */}
            <div className={`silhouette ${theme.id}`} style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '300px',
                zIndex: 2
            }}>
                {/* Head */}
                <div style={{
                    width: '60px',
                    height: '70px',
                    background: '#ddd',
                    borderRadius: '30px',
                    margin: '0 auto',
                    position: 'relative',
                    top: '0'
                }} />
                {/* Body */}
                <div style={{
                    width: '80px',
                    height: '140px',
                    background: '#ddd',
                    borderRadius: '20px',
                    margin: '-10px auto 0',
                    position: 'relative',
                    zIndex: -1
                }} />
                {/* Legs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                    <div style={{ width: '25px', height: '100px', background: '#ddd', borderRadius: '10px' }} />
                    <div style={{ width: '25px', height: '100px', background: '#ddd', borderRadius: '10px' }} />
                </div>
                {/* Arms */}
                <div style={{
                    position: 'absolute', top: '70px', left: '-25px',
                    width: '20px', height: '110px', background: '#ddd', borderRadius: '10px', transform: 'rotate(10deg)'
                }} />
                <div style={{
                    position: 'absolute', top: '70px', right: '-25px',
                    width: '20px', height: '110px', background: '#ddd', borderRadius: '10px', transform: 'rotate(-10deg)'
                }} />
            </div>

            {/* Equipped Items Layers */}
            {Object.entries(equippedItems).map(([slot, item]) => {
                const style = slots[slot];
                if (!style || !item?.image) return null;

                return (
                    <img
                        key={slot}
                        src={item.image}
                        alt={item.name}
                        style={{
                            position: 'absolute',
                            ...style,
                            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))',
                            animation: 'float 6s ease-in-out infinite'
                        }}
                    />
                );
            })}
        </div>
    );
};

export default AvatarViewer;
