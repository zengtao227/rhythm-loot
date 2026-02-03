import { useState, useEffect, useCallback } from 'react';
import { rarityConfig, streakBonuses } from '../themes/themeConfig';

const STORAGE_KEY = 'rhythm_loot_data';

/**
 * Custom hook for managing inventory and loot system
 */
export function useInventory(themeId) {
    const [inventory, setInventory] = useState([]);
    const [streak, setStreak] = useState(0);
    const [lastPracticeDate, setLastPracticeDate] = useState(null);
    const [restDayUsed, setRestDayUsed] = useState(false);
    const [earnedBadges, setEarnedBadges] = useState([]);
    const [equippedItems, setEquippedItems] = useState({});

    // Load data from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                if (data[themeId]) {
                    setInventory(data[themeId].inventory || []);
                    setStreak(data[themeId].streak || 0);
                    setLastPracticeDate(data[themeId].lastPracticeDate || null);
                    setRestDayUsed(data[themeId].restDayUsed || false);
                    setRestDayUsed(data[themeId].restDayUsed || false);
                    setEarnedBadges(data[themeId].earnedBadges || []);
                    setEquippedItems(data[themeId].equippedItems || {});
                }
            }
        } catch (e) {
            console.error('Failed to load inventory:', e);
        }
    }, [themeId]);

    // Save data to localStorage
    const saveData = useCallback((newInventory, newStreak, newLastDate, newRestDayUsed, newEarnedBadges, newEquippedItems) => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            const data = stored ? JSON.parse(stored) : {};
            data[themeId] = {
                inventory: newInventory,
                streak: newStreak,
                lastPracticeDate: newLastDate,
                restDayUsed: newRestDayUsed,
                restDayUsed: newRestDayUsed,
                earnedBadges: newEarnedBadges, // Persistence for badges
                equippedItems: newEquippedItems // Persistence for avatar
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Failed to save inventory:', e);
        }
    }, [themeId]);

    // Calculate streak when practicing
    const updateStreak = useCallback(() => {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (lastPracticeDate === today) {
            // Already practiced today
            return streak;
        }

        let newStreak = streak;
        let newRestDayUsed = restDayUsed;

        if (lastPracticeDate === yesterday) {
            // Consecutive day
            newStreak = streak + 1;
            // Reset rest day each week (every 7 days)
            if (newStreak % 7 === 0) {
                newRestDayUsed = false;
            }
        } else if (lastPracticeDate) {
            // Check if within rest day allowance
            const dayBeforeYesterday = new Date(Date.now() - 172800000).toDateString();
            if (lastPracticeDate === dayBeforeYesterday && !restDayUsed) {
                // Use rest day
                newStreak = streak + 1;
                newRestDayUsed = true;
            } else {
                // Streak broken
                newStreak = 1;
                newRestDayUsed = false;
            }
            // First time
            newStreak = 1;
        }

        // Check for new badges
        let newEarnedBadges = [...earnedBadges];
        const bonus = streakBonuses.find(b => b.days === newStreak);
        if (bonus && bonus.badgeId && !newEarnedBadges.includes(bonus.badgeId)) {
            newEarnedBadges.push(bonus.badgeId);
            // Could return this to trigger a notification UI side
        }

        setStreak(newStreak);
        setLastPracticeDate(today);
        setRestDayUsed(newRestDayUsed);
        setEarnedBadges(newEarnedBadges);
        setEarnedBadges(newEarnedBadges);
        saveData(inventory, newStreak, today, newRestDayUsed, newEarnedBadges, equippedItems);

        return newStreak;
    }, [streak, lastPracticeDate, restDayUsed, inventory, earnedBadges, equippedItems, saveData]);

    // Get applicable streak bonus
    const getStreakBonus = useCallback((currentStreak) => {
        // Find the highest applicable bonus
        let bonus = null;
        for (const b of streakBonuses) {
            if (currentStreak >= b.days) {
                bonus = b;
            }
        }
        return bonus;
    }, []);

    // Roll for rarity based on weights and streak bonuses
    const rollRarity = useCallback((currentStreak) => {
        const bonus = getStreakBonus(currentStreak);

        // Calculate weights with streak modifications
        let weights = { ...rarityConfig };

        // Apply streak bonuses
        if (bonus) {
            if (bonus.effect === 'doubleEpic') {
                // Double epic drop rate
                const extraWeight = weights.epic.weight;
                weights = {
                    ...weights,
                    epic: { ...weights.epic, weight: weights.epic.weight * 2 },
                };
            }

            if (bonus.guarantee) {
                // Return guaranteed rarity
                const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
                const minIndex = rarityOrder.indexOf(bonus.guarantee);

                // Calculate total weight for guaranteed+ rarities
                let totalWeight = 0;
                const eligibleRarities = [];

                for (let i = minIndex; i < rarityOrder.length; i++) {
                    const rarity = rarityOrder[i];
                    totalWeight += rarityConfig[rarity].weight;
                    eligibleRarities.push(rarity);
                }

                // Roll within eligible rarities
                let roll = Math.random() * totalWeight;
                for (const rarity of eligibleRarities) {
                    roll -= rarityConfig[rarity].weight;
                    if (roll <= 0) {
                        return rarity;
                    }
                }
                return eligibleRarities[eligibleRarities.length - 1];
            }
        }

        // Normal roll
        const totalWeight = Object.values(rarityConfig).reduce((sum, r) => sum + r.weight, 0);
        let roll = Math.random() * totalWeight;

        for (const [rarity, config] of Object.entries(rarityConfig)) {
            roll -= config.weight;
            if (roll <= 0) {
                return rarity;
            }
        }

        return 'common';
    }, [getStreakBonus]);

    // Get a random reward from a theme
    const getRandomReward = useCallback((theme, currentStreak) => {
        const rarity = rollRarity(currentStreak);

        // Filter rewards by rarity
        const eligibleRewards = theme.rewards.filter(r => r.rarity === rarity);

        if (eligibleRewards.length === 0) {
            // Fallback to any reward of that rarity or lower
            const rarityOrder = ['legendary', 'epic', 'rare', 'uncommon', 'common'];
            const startIndex = rarityOrder.indexOf(rarity);

            for (let i = startIndex; i < rarityOrder.length; i++) {
                const fallbackRewards = theme.rewards.filter(r => r.rarity === rarityOrder[i]);
                if (fallbackRewards.length > 0) {
                    const reward = fallbackRewards[Math.floor(Math.random() * fallbackRewards.length)];
                    return { ...reward, obtainedAt: Date.now() };
                }
            }
        }

        const reward = eligibleRewards[Math.floor(Math.random() * eligibleRewards.length)];
        return { ...reward, obtainedAt: Date.now() };
    }, [rollRarity]);

    // Add item to inventory
    const addToInventory = useCallback((item) => {
        const newInventory = [...inventory, item];
        setInventory(newInventory);
        saveData(newInventory, streak, lastPracticeDate, restDayUsed, earnedBadges, equippedItems);
    }, [inventory, streak, lastPracticeDate, restDayUsed, earnedBadges, equippedItems, saveData]);

    // Equip or unequip an item
    const toggleEquip = useCallback((item) => {
        if (!item.slot) return; // Cannot equip items without a slot

        setEquippedItems(prev => {
            const currentEquipped = prev[item.slot];
            let newEquipped = { ...prev };

            if (currentEquipped && currentEquipped.id === item.id) {
                // Already equipped, so unequip
                delete newEquipped[item.slot];
            } else {
                // Equip new item (replaces old one in same slot)
                newEquipped[item.slot] = item;
            }

            saveData(inventory, streak, lastPracticeDate, restDayUsed, earnedBadges, newEquipped);
            return newEquipped;
        });
    }, [inventory, streak, lastPracticeDate, restDayUsed, earnedBadges, saveData]);

    // Get inventory statistics
    const getStats = useCallback(() => {
        const stats = {
            total: inventory.length,
            byRarity: {
                common: 0,
                uncommon: 0,
                rare: 0,
                epic: 0,
                legendary: 0,
            },
        };

        inventory.forEach(item => {
            if (stats.byRarity[item.rarity] !== undefined) {
                stats.byRarity[item.rarity]++;
            }
        });

        return stats;
    }, [inventory]);

    return {
        inventory,
        streak,
        lastPracticeDate,
        restDayUsed,
        updateStreak,
        getStreakBonus,
        getRandomReward,
        addToInventory,
        getStats,
        earnedBadges,
        equippedItems,
        toggleEquip,
    };
}

export default useInventory;
