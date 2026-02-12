// Theme configurations for both profiles
// Asset base path for rewards (Pointing to public folder for stability)
const BLINK_ASSETS = '/assets/rewards/blink/v1';
const QUEST_ASSETS = '/assets/rewards/quest/v1';
const FORTNITE_ASSETS = '/assets/rewards/quest/v_fortnite';

export const themes = {
    blink: {
        id: 'blink',
        name: 'Blink Stage',
        emoji: '🎤',
        tagline: 'Light up the concert!',
        beatVisual: 'lightstick',
        colors: {
            primary: '#ff2d7f',
            secondary: '#ff6b9d',
            accent: '#ff91b8',
            glow: 'rgba(255, 45, 127, 0.6)',
        },
        cssClass: 'blink',
        defaultDuration: 30, // minutes
        rewards: [
            // Common (50%)
            { id: 'bl_c1', name: 'Mini Lightstick', rarity: 'common', emoji: '🔦', slot: 'hand', image: `${BLINK_ASSETS}/blink_mini_lightstick_1769896924277.webp` },
            { id: 'bl_c2', name: 'Concert Ticket', rarity: 'common', emoji: '🎫', slot: 'misc', image: `${BLINK_ASSETS}/blink_concert_ticket_1769896936216.webp` },
            { id: 'bl_c3', name: 'Fan Banner', rarity: 'common', emoji: '🏳️', slot: 'hand', image: `${BLINK_ASSETS}/blink_fan_banner_1769896948265.webp` },
            { id: 'bl_c4', name: 'Photo Card', rarity: 'common', emoji: '🖼️', slot: 'misc', image: `${BLINK_ASSETS}/blink_photo_card_1769896960590.webp` },
            { id: 'bl_c5', name: 'Stage Pass', rarity: 'common', emoji: '🎟️', slot: 'neck', image: `${BLINK_ASSETS}/blink_stage_pass_1769896974863.webp` },
            { id: 'bl_c6', name: 'Sakura Fan', rarity: 'common', emoji: '🌸', slot: 'hand', image: `${BLINK_ASSETS}/blink_sakura_fan_common.webp` },
            // Uncommon (30%)
            { id: 'bl_u1', name: 'Neon Bracelet', rarity: 'uncommon', emoji: '💫', slot: 'hand', image: `${BLINK_ASSETS}/blink_neon_bracelet_1769896993628.webp` },
            { id: 'bl_u2', name: 'VIP Lanyard', rarity: 'uncommon', emoji: '🎀', slot: 'neck', image: `${BLINK_ASSETS}/blink_vip_lanyard_v1_1770124180454.webp` },
            { id: 'bl_u3', name: 'Hologram Sticker', rarity: 'uncommon', emoji: '✨', slot: 'misc', image: `${BLINK_ASSETS}/blink_hologram_sticker_v1_1770124195628.webp` },
            { id: 'bl_u4', name: 'Cat Ears Headset', rarity: 'uncommon', emoji: '🎧', slot: 'head', image: `${BLINK_ASSETS}/blink_cat_ears_headset_1769898724226.webp` },
            { id: 'bl_u5', name: 'Labubu Doll', rarity: 'uncommon', emoji: '🐰', slot: 'misc', image: `${BLINK_ASSETS}/blink_labubu_doll_common.webp` },
            { id: 'bl_u6', name: 'Neko Headphones', rarity: 'uncommon', emoji: '🐱', slot: 'head', image: `${BLINK_ASSETS}/blink_neko_headphones_rare.webp` },
            // Rare (15%)
            { id: 'bl_r1', name: 'Crown Headband', rarity: 'rare', emoji: '👑', slot: 'head', image: `${BLINK_ASSETS}/blink_crown_headband_v1_1770124210699.webp` },
            { id: 'bl_r2', name: 'LED Earrings', rarity: 'rare', emoji: '💎', slot: 'head', image: `${BLINK_ASSETS}/blink_led_earrings_1769897104599.webp` },
            { id: 'bl_r3', name: 'Signed Album', rarity: 'rare', emoji: '💿', slot: 'misc', image: `${BLINK_ASSETS}/blink_signed_album_1769897118991.webp` },
            { id: 'bl_r4', name: 'Pink Sparkle Mic', rarity: 'rare', emoji: '🎤', slot: 'hand', image: `${BLINK_ASSETS}/blink_diamond_microphone_v1_new_1770124226307.webp` },
            { id: 'bl_r5', name: 'Labubu Space Suit', rarity: 'rare', emoji: '👩‍🚀', slot: 'misc', image: `${BLINK_ASSETS}/blink_labubu_space_suit_rare.webp` },
            // Epic (4%)
            { id: 'bl_e1', name: 'Golden Lightstick', rarity: 'epic', emoji: '🌟', slot: 'hand', image: `${BLINK_ASSETS}/blink_golden_lightstick_1769897131759.webp` },
            { id: 'bl_e2', name: 'Angel Wings', rarity: 'epic', emoji: '👼', slot: 'back', image: `${BLINK_ASSETS}/blink_angel_wings_1769898626049.webp` },
            { id: 'bl_e3', name: 'Magical Scepter', rarity: 'epic', emoji: '🌙', slot: 'hand', image: `${BLINK_ASSETS}/blink_moon_scepter_epic.webp` },
            // Legendary (1%)
            { id: 'bl_l1', name: 'Diamond Microphone', rarity: 'legendary', emoji: '💖', slot: 'hand', image: `${BLINK_ASSETS}/blink_diamond_microphone_v1_new_1770124226307.webp` },
            { id: 'bl_l2', name: 'Galaxy Stage Outfit', rarity: 'legendary', emoji: '👗', slot: 'body', image: `${BLINK_ASSETS}/blink_galaxy_outfit_1769898660427.webp` },
        ],
    },
    quest: {
        id: 'quest',
        name: 'Legend Quest',
        emoji: '⚔️',
        tagline: 'Heroic loot for Leo!',
        beatVisual: 'blasters',
        colors: {
            primary: '#00d4ff',
            secondary: '#7b2cbf',
            accent: '#00ff41',
            glow: 'rgba(0, 212, 255, 0.6)',
        },
        cssClass: 'quest',
        defaultDuration: 30, // minutes
        rewards: [
            // RPG Classics
            { id: 'qt_c1', name: 'Master Sword', rarity: 'epic', emoji: '🗡️', slot: 'hand', image: `${QUEST_ASSETS}/quest_master_sword_1769898606843.webp` },
            { id: 'qt_c2', name: 'Hylian Shield', rarity: 'uncommon', emoji: '🛡️', slot: 'hand', image: `${QUEST_ASSETS}/zelda_hylian_shield_uncommon_1770299620948.webp` },
            { id: 'qt_r6', name: 'Ocarina of Time', rarity: 'rare', emoji: '🎶', slot: 'hand', image: `${QUEST_ASSETS}/zelda_ocarina_of_time_rare_1770299642102.webp` },
            { id: 'qt_l1', name: 'Triforce Fragment', rarity: 'legendary', emoji: '🔺', slot: 'misc', image: `${QUEST_ASSETS}/quest_triforce_v1_new_1769897503305.webp` },

            // Battle Royale (Merged)
            { id: 'fn_l1', name: 'Golden Scar', rarity: 'legendary', emoji: '🔫', slot: 'hand', image: `${FORTNITE_ASSETS}/quest_fortnite_golden_scar_1770125429253.webp` },
            { id: 'fn_u1', name: 'Supply Llama', rarity: 'uncommon', emoji: '🦙', slot: 'misc', image: `${FORTNITE_ASSETS}/quest_fortnite_llama_1770125341642.webp` },
            { id: 'fn_r2', name: 'Chug Jug', rarity: 'rare', emoji: '🍶', slot: 'misc', image: `${FORTNITE_ASSETS}/fortnite_chug_jug_rare_1770299558096.webp` },
            { id: 'fn_e1', name: 'Mecha Mask', rarity: 'epic', emoji: '🤖', slot: 'head', image: `${FORTNITE_ASSETS}/fortnite_mecha_mask_epic_1770299528557.webp` },

            // Cyber Ops (Merged)
            { id: 'cp_e3', name: 'Cyber Katana', rarity: 'epic', emoji: '⚔️', slot: 'hand', image: '/assets/images/loot/cyber_katana_epic.webp' },
            { id: 'cp_e1', name: 'Cyber Railgun', rarity: 'epic', emoji: '⚡', slot: 'hand', image: '/assets/images/loot/cyber_railgun.webp' },
            { id: 'cp_r2', name: 'Plasma Rifle', rarity: 'rare', emoji: '🔋', slot: 'hand', image: '/assets/images/loot/plasma_rifle.webp' },
            { id: 'cp_u4', name: 'Hacking Deck', rarity: 'uncommon', emoji: '📟', slot: 'hand', image: '/assets/images/loot/cyber_hacking_deck_uncommon.webp' },

            // Other Quest Items
            { id: 'qt_r2', name: 'Golden Crown', rarity: 'rare', emoji: '👑', slot: 'head', image: `${QUEST_ASSETS}/quest_golden_crown_1769898741006.webp` },
            { id: 'qt_u5', name: 'Power Star', rarity: 'uncommon', emoji: '⭐', slot: 'misc', image: `${QUEST_ASSETS}/quest_power_star_v1_1769897356747.webp` },
            { id: 'qt_r4', name: 'Luffy Hat', rarity: 'rare', emoji: '👒', slot: 'head', image: `${QUEST_ASSETS}/quest_straw_hat_luffy_v1_new_1769897464074.webp` }
        ],
    },
};

// Rarity configuration
export const rarityConfig = {
    common: {
        name: 'Common',
        weight: 50,
        color: '#9ca3af',
        glowIntensity: 1,
    },
    uncommon: {
        name: 'Uncommon',
        weight: 30,
        color: '#22c55e',
        glowIntensity: 1.5,
    },
    rare: {
        name: 'Rare',
        weight: 15,
        color: '#3b82f6',
        glowIntensity: 2,
    },
    epic: {
        name: 'Epic',
        weight: 4,
        color: '#a855f7',
        glowIntensity: 2.5,
    },
    legendary: {
        name: 'Legendary',
        weight: 1,
        color: '#fbbf24',
        glowIntensity: 3,
        specialEffect: 'screenShake',
    },
};

// Streak bonus thresholds
export const streakBonuses = [
    { days: 3, guarantee: 'uncommon', description: 'Guaranteed Uncommon+', badgeId: 'novice' },
    { days: 7, guarantee: 'rare', bonus: true, description: 'Guaranteed Rare + Bonus', badgeId: 'apprentice' },
    { days: 14, effect: 'doubleEpic', description: 'Epic chance doubled', badgeId: 'expert' },
    { days: 30, guarantee: 'legendary', badge: true, description: 'Guaranteed Legendary!', badgeId: 'master' },
];

// Badge Definitions
export const badges = {
    novice: {
        id: 'novice',
        name: 'Novice Rhythm',
        icon: '🥉',
        color: '#CD7F32', // Bronze
        description: 'Practice for 3 days in a row'
    },
    apprentice: {
        id: 'apprentice',
        name: 'Rhythm Keeper',
        icon: '🥈',
        color: '#C0C0C0', // Silver
        description: 'Practice for 7 days in a row'
    },
    expert: {
        id: 'expert',
        name: 'Sonic Virtuoso',
        icon: '🥇',
        color: '#FFD700', // Gold
        description: 'Practice for 14 days in a row'
    },
    master: {
        id: 'master',
        name: 'Metronome Master',
        icon: '💎',
        color: '#E5E4E2', // Platinum
        description: 'Practice for 30 days in a row'
    }
};

export default themes;
