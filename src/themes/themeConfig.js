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
            // Uncommon (30%)
            { id: 'bl_u1', name: 'Neon Bracelet', rarity: 'uncommon', emoji: '💫', slot: 'hand', image: `${BLINK_ASSETS}/blink_neon_bracelet_1769896993628.webp` },
            { id: 'bl_u2', name: 'VIP Lanyard', rarity: 'uncommon', emoji: '🎀', slot: 'neck', image: `${BLINK_ASSETS}/blink_vip_lanyard_v1_1770124180454.webp` },
            { id: 'bl_u3', name: 'Hologram Sticker', rarity: 'uncommon', emoji: '✨', slot: 'misc', image: `${BLINK_ASSETS}/blink_hologram_sticker_v1_1770124195628.webp` },
            { id: 'bl_u4', name: 'Cat Ears Headset', rarity: 'uncommon', emoji: '🎧', slot: 'head', image: `${BLINK_ASSETS}/blink_cat_ears_headset_1769898724226.webp` },
            { id: 'bl_u5', name: 'Labubu Doll', rarity: 'uncommon', emoji: '🐰', slot: 'misc', image: `${BLINK_ASSETS}/blink_labubu_doll_common.webp` },
            // Rare (15%)
            { id: 'bl_r1', name: 'Crown Headband', rarity: 'rare', emoji: '👑', slot: 'head', image: `${BLINK_ASSETS}/blink_crown_headband_v1_1770124210699.webp` },
            { id: 'bl_r2', name: 'LED Earrings', rarity: 'rare', emoji: '💎', slot: 'head', image: `${BLINK_ASSETS}/blink_led_earrings_1769897104599.webp` },
            { id: 'bl_r3', name: 'Signed Album', rarity: 'rare', emoji: '💿', slot: 'misc', image: `${BLINK_ASSETS}/blink_signed_album_1769897118991.webp` },
            { id: 'bl_r4', name: 'Pink Sparkle Mic', rarity: 'rare', emoji: '🎤', slot: 'hand', image: `${BLINK_ASSETS}/blink_diamond_microphone_v1_new_1770124226307.webp` },
            { id: 'bl_r5', name: 'Labubu Space Suit', rarity: 'rare', emoji: '👩‍🚀', slot: 'misc', image: `${BLINK_ASSETS}/blink_labubu_space_suit_rare.webp` },
            // Epic (4%)
            { id: 'bl_e1', name: 'Golden Lightstick', rarity: 'epic', emoji: '🌟', slot: 'hand', image: `${BLINK_ASSETS}/blink_golden_lightstick_1769897131759.webp` },
            { id: 'bl_e2', name: 'Angel Wings', rarity: 'epic', emoji: '👼', slot: 'back', image: `${BLINK_ASSETS}/blink_angel_wings_1769898626049.webp` },
            // Legendary (1%)
            { id: 'bl_l1', name: 'Diamond Microphone', rarity: 'legendary', emoji: '💖', slot: 'hand', image: `${BLINK_ASSETS}/blink_diamond_microphone_v1_new_1770124226307.webp` },
            { id: 'bl_l2', name: 'Galaxy Stage Outfit', rarity: 'legendary', emoji: '👗', slot: 'body', image: `${BLINK_ASSETS}/blink_galaxy_outfit_1769898660427.webp` },
        ],
    },
    quest: {
        id: 'quest',
        name: 'Quest Loot',
        emoji: '⚔️',
        tagline: 'Unlock ancient secrets!',
        colors: {
            primary: '#00d4ff',
            secondary: '#00ffaa',
            accent: '#ffa500',
            glow: 'rgba(0, 212, 255, 0.6)',
        },
        cssClass: 'quest',
        defaultDuration: 30, // minutes
        rewards: [
            // Common (50%)
            { id: 'qt_c1', name: 'Wooden Sword', rarity: 'common', emoji: '🗡️', slot: 'hand', image: `${QUEST_ASSETS}/quest_wooden_sword_v2_1769897194589.webp` },
            { id: 'qt_c2', name: 'Iron Ingot', rarity: 'common', emoji: '🔩', slot: 'misc', image: `${QUEST_ASSETS}/quest_iron_ingot_v2_1769897207144.webp` },
            { id: 'qt_c3', name: 'Treasure Map', rarity: 'common', emoji: '🗺️', slot: 'misc', image: `${QUEST_ASSETS}/quest_treasure_map_v2_1769897219549.webp` },
            { id: 'qt_c4', name: 'Copper Coin', rarity: 'common', emoji: '🪙', slot: 'misc', image: `${QUEST_ASSETS}/quest_copper_coin_1769897231090.webp` },
            { id: 'qt_c5', name: 'Explorer Hat', rarity: 'common', emoji: '🎩', slot: 'head', image: `${QUEST_ASSETS}/quest_explorer_hat_1769897244334.webp` },
            { id: 'qt_c6', name: 'Heart Container', rarity: 'common', emoji: '❤️', slot: 'misc', image: `${QUEST_ASSETS}/zelda_heart_container_common_1770299578346.webp` },
            { id: 'qt_c7', name: 'Korok Seed', rarity: 'common', emoji: '🌱', slot: 'misc', image: `${QUEST_ASSETS}/zelda_korok_seed_common_1770299601611.webp` },
            // Uncommon (30%)
            { id: 'qt_u1', name: 'Sheikah Slate', rarity: 'uncommon', emoji: '📱', slot: 'hand', image: `${QUEST_ASSETS}/quest_sheikah_slate_1769897261806.webp` },
            { id: 'qt_u2', name: 'Golden Scarf', rarity: 'uncommon', emoji: '🧣', slot: 'neck', image: `${QUEST_ASSETS}/quest_golden_scarf_v1_new_1770124239976.webp` },
            { id: 'qt_u3', name: 'Magic Compass', rarity: 'uncommon', emoji: '🧭', slot: 'hand', image: `${QUEST_ASSETS}/quest_magic_compass_v1_1769897368908.webp` },
            { id: 'qt_u4', name: 'Crystal Shard', rarity: 'uncommon', emoji: '💠', slot: 'misc', image: `${QUEST_ASSETS}/quest_crystal_shard_v1_1769897382909.webp` },
            { id: 'qt_u5', name: 'Power Star', rarity: 'uncommon', emoji: '⭐', slot: 'misc', image: `${QUEST_ASSETS}/quest_power_star_v1_1769897356747.webp` },
            { id: 'qt_u6', name: 'Hylian Shield', rarity: 'uncommon', emoji: '🛡️', slot: 'hand', image: `${QUEST_ASSETS}/zelda_hylian_shield_uncommon_1770299620948.webp` },
            { id: 'qt_u7', name: 'Fairy Bottle', rarity: 'uncommon', emoji: '🧚', slot: 'misc', image: `${QUEST_ASSETS}/zelda_fairy_bottle_uncommon.webp` },
            // Rare (15%)
            { id: 'qt_r1', name: 'Diamond Pickaxe', rarity: 'rare', emoji: '⛏️', slot: 'hand', image: `${QUEST_ASSETS}/quest_diamond_pickaxe_v1_1769897395799.webp` },
            { id: 'qt_r2', name: 'Golden Crown', rarity: 'rare', emoji: '👑', slot: 'head', image: `${QUEST_ASSETS}/quest_golden_crown_1769898741006.webp` },
            { id: 'qt_r3', name: 'Thunder Cape', rarity: 'rare', emoji: '⚡', slot: 'back', image: `${QUEST_ASSETS}/quest_thunder_cape_1769898643511.webp` },
            { id: 'qt_r4', name: 'Straw Hat', rarity: 'rare', emoji: '👒', slot: 'head', image: `${QUEST_ASSETS}/quest_straw_hat_luffy_v1_new_1769897464074.webp` },
            { id: 'qt_r5', name: 'Ender Pearl', rarity: 'rare', emoji: '🔮', slot: 'misc', image: `${QUEST_ASSETS}/quest_ender_pearl_v1_1769897476903.webp` },
            { id: 'qt_r6', name: 'Ocarina of Time', rarity: 'rare', emoji: '🎶', slot: 'hand', image: `${QUEST_ASSETS}/zelda_ocarina_of_time_rare_1770299642102.webp` },
            // Epic (4%)
            { id: 'qt_e1', name: 'Master Sword', rarity: 'epic', emoji: '🔱', slot: 'hand', image: `${QUEST_ASSETS}/quest_master_sword_v1_1769897407601.webp` },
            { id: 'qt_e2', name: 'Devil Fruit', rarity: 'epic', emoji: '🍇', slot: 'misc', image: `${QUEST_ASSETS}/quest_devil_fruit_v1_new_1769897489828.webp` },
            { id: 'qt_e3', name: 'Light Arrows', rarity: 'epic', emoji: '🏹', slot: 'hand', image: `${QUEST_ASSETS}/zelda_light_arrows_epic.webp` },
            // Legendary (1%)
            { id: 'qt_l1', name: 'Triforce Fragment', rarity: 'legendary', emoji: '🔺', slot: 'misc', image: `${QUEST_ASSETS}/quest_triforce_v1_new_1769897503305.webp` },
        ],
    },
    // Fortnite Theme Pack (can be swapped in for quest)
    fortnite: {
        id: 'fortnite',
        name: 'Battle Royale',
        emoji: '🎮',
        tagline: 'Drop into victory!',
        colors: {
            primary: '#9d4edd',
            secondary: '#f72585',
            accent: '#4cc9f0',
            glow: 'rgba(157, 78, 221, 0.6)',
        },
        cssClass: 'quest', // Reuses quest styling
        defaultDuration: 30,
        rewards: [
            // Common (50%)
            { id: 'fn_c1', name: 'V-Bucks', rarity: 'common', emoji: '💰', slot: 'misc', image: `${FORTNITE_ASSETS}/quest_fortnite_vbucks_1770125358581.webp` },
            { id: 'fn_c2', name: 'Slurp Juice', rarity: 'common', emoji: '🧃', slot: 'misc', image: `${FORTNITE_ASSETS}/quest_fortnite_slurp_1770125376129.webp` },
            // Uncommon (30%)
            { id: 'fn_u1', name: 'Supply Llama', rarity: 'uncommon', emoji: '🦙', slot: 'misc', image: `${FORTNITE_ASSETS}/quest_fortnite_llama_1770125341642.webp` },
            { id: 'fn_u2', name: 'Boogie Bomb', rarity: 'uncommon', emoji: '🪩', slot: 'hand', image: `${FORTNITE_ASSETS}/quest_fortnite_boogie_bomb_1770125389011.webp` },
            // Rare (15%)
            { id: 'fn_r1', name: 'Battle Bus', rarity: 'rare', emoji: '🚌', slot: 'misc', image: `${FORTNITE_ASSETS}/quest_fortnite_battle_bus_1770125403708.webp` },
            { id: 'fn_r2', name: 'Chug Jug', rarity: 'rare', emoji: '🍶', slot: 'misc', image: `${FORTNITE_ASSETS}/fortnite_chug_jug_rare_1770299558096.webp` },
            { id: 'fn_e1', name: 'Mecha Mask', rarity: 'epic', emoji: '🤖', slot: 'head', image: `${FORTNITE_ASSETS}/fortnite_mecha_mask_epic_1770299528557.webp` },
            // Legendary (1%)
            { id: 'fn_l1', name: 'Golden Scar', rarity: 'legendary', emoji: '🔫', slot: 'hand', image: `${FORTNITE_ASSETS}/quest_fortnite_golden_scar_1770125429253.webp` },
        ],
    },
    cyberpunk: {
        id: 'cyberpunk',
        name: 'Cyber Ops',
        emoji: '🦾',
        tagline: 'High-tech warfare!',
        colors: {
            primary: '#00ff41', // Matrix Green
            secondary: '#008F11',
            accent: '#0d0221',
            glow: 'rgba(0, 255, 65, 0.6)',
        },
        cssClass: 'quest',
        defaultDuration: 45,
        rewards: [
            // Common
            { id: 'cp_c1', name: 'Slime Blob', rarity: 'common', emoji: '🦠', slot: 'misc', image: '/assets/images/loot/slime_blob.webp' },
            { id: 'cp_c2', name: 'Cyber Pistol', rarity: 'common', emoji: '🔫', slot: 'hand', image: '/assets/images/loot/cyber_pistol.webp' },
            // Uncommon
            { id: 'cp_u1', name: 'Holo Sight', rarity: 'uncommon', emoji: '🎯', slot: 'misc', image: '/assets/images/loot/holo_sight.webp' },
            { id: 'cp_u2', name: 'Shadow Drone', rarity: 'uncommon', emoji: '🛸', slot: 'misc', image: '/assets/images/loot/shadow_drone.webp' },
            { id: 'cp_u3', name: 'Tactical Visor', rarity: 'uncommon', emoji: '🥽', slot: 'head', image: '/assets/images/loot/tactical_visor.webp' },
            // Rare
            { id: 'cp_r1', name: 'Mecha Spider', rarity: 'rare', emoji: '🕷️', slot: 'misc', image: '/assets/images/loot/mecha_spider.webp' },
            { id: 'cp_r2', name: 'Plasma Rifle', rarity: 'rare', emoji: '🔋', slot: 'hand', image: '/assets/images/loot/plasma_rifle.webp' },
            // Epic
            { id: 'cp_e1', name: 'Cyber Railgun', rarity: 'epic', emoji: '⚡', slot: 'hand', image: '/assets/images/loot/cyber_railgun.webp' },
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
