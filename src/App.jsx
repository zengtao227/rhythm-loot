import { useState, useEffect, useCallback } from 'react';
import { themes } from './themes/themeConfig';
import { useAudioTracker } from './hooks/useAudioTracker';
import { useInventory } from './hooks/useInventory';
import { useMetronome } from './hooks/useMetronome';
import { injectAnimations } from './utils/uiEffects';
import ProfileCard from './components/UI/ProfileCard';
import RhythmTimer from './components/UI/RhythmTimer';
import AudioBars from './components/AudioViz/AudioBars';
import ParticleCanvas from './components/AudioViz/ParticleCanvas';
import LootBoxReveal from './components/LootBox/LootBoxReveal';
import InventoryGallery from './components/LootBox/InventoryGallery';

// App states
const SCREEN = {
    SELECT: 'select',
    SETUP: 'setup',
    PRACTICE: 'practice',
    COMPLETE: 'complete',
};

function App() {
    // Inject UI effect animations on mount
    useEffect(() => {
        injectAnimations();
    }, []);

    // Core state
    const [screen, setScreen] = useState(SCREEN.SELECT);
    const [screenTransition, setScreenTransition] = useState('');
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [targetDuration, setTargetDuration] = useState(30); // minutes
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    // Metronome state
    const [metronomeActive, setMetronomeActive] = useState(false);
    const [bpm, setBpm] = useState(100);

    // UI state
    const [showInventory, setShowInventory] = useState(false);
    const [currentReward, setCurrentReward] = useState(null);

    // Get theme config
    const theme = selectedTheme ? themes[selectedTheme] : null;

    // Metronome hook
    const { currentBeat } = useMetronome(bpm, selectedTheme || 'blink', metronomeActive && screen === SCREEN.PRACTICE);

    // Audio tracking
    const {
        isListening,
        isActive,
        audioLevel,
        frequencyData,
        error: audioError,
        startListening,
        stopListening
    } = useAudioTracker({
        silenceThreshold: 0.015,
        silenceTimeout: 5000,
    });

    // Inventory management
    const {
        inventory,
        streak,
        updateStreak,
        getStreakBonus,
        getRandomReward,
        addToInventory,
        earnedBadges,
        equippedItems,
        toggleEquip
    } = useInventory(selectedTheme || 'blink');

    // Helper function to change screen with transition
    const changeScreen = (newScreen) => {
        setScreenTransition('screen-transition-exit');
        setTimeout(() => {
            setScreen(newScreen);
            setScreenTransition('screen-transition-enter');
        }, 400);
    };

    // Timer logic - only counts when actively playing
    useEffect(() => {
        if (screen !== SCREEN.PRACTICE || !isActive) return;

        const interval = setInterval(() => {
            setElapsedSeconds(prev => {
                const next = prev + 1;
                const targetSeconds = targetDuration * 60;

                if (next >= targetSeconds) {
                    // Practice complete!
                    handlePracticeComplete();
                    return targetSeconds;
                }

                return next;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [screen, isActive, targetDuration]);

    // Handle practice completion
    const handlePracticeComplete = useCallback(() => {
        stopListening();

        // Update streak
        const newStreak = updateStreak();
        const streakBonus = getStreakBonus(newStreak);

        // Generate reward
        const reward = getRandomReward(theme, newStreak);
        addToInventory(reward);

        setCurrentReward({ reward, streakBonus });
        setScreen(SCREEN.COMPLETE);
    }, [theme, updateStreak, getStreakBonus, getRandomReward, addToInventory, stopListening]);

    // Start practice session
    const handleStartPractice = async () => {
        setElapsedSeconds(0);
        await startListening();
        changeScreen(SCREEN.PRACTICE);
    };

    // Cancel/stop practice
    const handleStopPractice = () => {
        stopListening();
        setElapsedSeconds(0);
        changeScreen(SCREEN.SELECT);
    };

    // Close reward modal and return to select
    const handleRewardClose = () => {
        setCurrentReward(null);
        changeScreen(SCREEN.SELECT);
        setSelectedTheme(null);
    };

    // Calculate progress
    const progress = elapsedSeconds / (targetDuration * 60);

    return (
        <div className="app-container">
            {/* Particle Background (only during practice) */}
            {screen === SCREEN.PRACTICE && selectedTheme && (
                <ParticleCanvas
                    theme={selectedTheme}
                    audioLevel={audioLevel}
                    isActive={isActive}
                />
            )}

            {/* ========== PROFILE SELECT SCREEN ========== */}
            {screen === SCREEN.SELECT && (
                <div className={screenTransition} style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '2rem 0',
                }}>
                    {/* Title */}
                    <div className="text-center mb-xl">
                        <h1
                            className="title-glow"
                            style={{
                                fontSize: '2rem',
                                color: '#a855f7',
                                marginBottom: '0.5rem',
                            }}
                        >
                            Rhythm & Loot
                        </h1>
                        <p className="text-muted">Choose your stage</p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        maxWidth: '700px',
                        margin: '0 auto',
                        width: '100%',
                    }}>
                        {Object.values(themes).map(t => (
                            <ProfileCard
                                key={t.id}
                                themeId={t.id}
                                selected={selectedTheme === t.id}
                                onClick={() => setSelectedTheme(t.id)}
                                streak={streak}
                            />
                        ))}
                    </div>

                    {/* Continue Button */}
                    {selectedTheme && (
                        <div className="text-center mt-xl" style={{ animation: 'fadeIn 0.3s ease' }}>
                            <button
                                className={`btn btn-${selectedTheme}`}
                                onClick={() => changeScreen(SCREEN.SETUP)}
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {/* Inventory Button */}
                    {selectedTheme && inventory.length > 0 && (
                        <div className="text-center mt-lg">
                            <button
                                className="btn btn-outline"
                                onClick={() => setShowInventory(true)}
                            >
                                📦 My Collection ({inventory.length})
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ========== SETUP SCREEN ========== */}
            {screen === SCREEN.SETUP && theme && (
                <div className={screenTransition} style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    {/* Back Button */}
                    <button
                        className="btn btn-outline"
                        onClick={() => changeScreen(SCREEN.SELECT)}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1rem',
                            padding: '0.5rem 1rem',
                        }}
                    >
                        ← Back
                    </button>

                    {/* Theme Header */}
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                        {theme.emoji}
                    </div>
                    <h2
                        style={{
                            color: theme.colors.primary,
                            marginBottom: '2rem',
                            textShadow: `0 0 20px ${theme.colors.glow}`,
                        }}
                    >
                        {theme.name}
                    </h2>

                    {/* Duration Selector */}
                    <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
                        <p className="text-muted mb-md">Practice Duration</p>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            flexWrap: 'wrap',
                        }}>
                            {[15, 20, 30, 45, 60].map(mins => (
                                <button
                                    key={mins}
                                    onClick={() => setTargetDuration(mins)}
                                    style={{
                                        padding: '0.75rem 1.25rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: `2px solid ${targetDuration === mins ? theme.colors.primary : 'rgba(255,255,255,0.1)'}`,
                                        background: targetDuration === mins ? `${theme.colors.primary}20` : 'transparent',
                                        color: targetDuration === mins ? theme.colors.primary : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '1rem',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {mins}m
                                </button>
                            ))}
                        </div>

                        {/* Streak Info */}
                        {streak > 0 && (
                            <div className="mt-lg">
                                <div className="streak-badge active" style={{ display: 'inline-flex' }}>
                                    🔥 {streak} Day Streak
                                </div>
                            </div>
                        )}
                    </div>

                    {/* BPM Selector */}
                    <div className="glass-card mt-lg" style={{ width: '100%', maxWidth: '400px' }}>
                        <p className="text-muted mb-md">Tempo (BPM)</p>
                        <div className="flex-center gap-lg">
                            <button
                                className="btn btn-outline"
                                style={{ width: '45px', height: '45px', padding: 0, borderRadius: '50%' }}
                                onClick={() => setBpm(Math.max(40, bpm - 1))}
                            >—</button>

                            <div style={{ textAlign: 'center', minWidth: '80px' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.colors.primary }}>{bpm}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>beats per min</div>
                            </div>

                            <button
                                className="btn btn-outline"
                                style={{ width: '45px', height: '45px', padding: 0, borderRadius: '50%' }}
                                onClick={() => setBpm(Math.min(200, bpm + 1))}
                            >+</button>
                        </div>

                        <input
                            type="range"
                            min="40"
                            max="200"
                            value={bpm}
                            onChange={(e) => setBpm(Number(e.target.value))}
                            style={{
                                width: '100%',
                                marginTop: '1.5rem',
                                accentColor: theme.colors.primary,
                                cursor: 'pointer'
                            }}
                        />

                        <div className="flex-between mt-sm" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            <span>Adagio (40)</span>
                            <span>Presto (200)</span>
                        </div>
                    </div>

                    {/* Start Button */}
                    <button
                        className={`btn btn-${selectedTheme} mt-xl`}
                        onClick={handleStartPractice}
                        style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}
                    >
                        🎻 Start Practice
                    </button>

                    {/* Audio Permission Note */}
                    <p className="text-muted mt-md" style={{ fontSize: '0.8rem' }}>
                        Microphone access required for sound detection
                    </p>
                </div>
            )}

            {/* ========== PRACTICE SCREEN ========== */}
            {screen === SCREEN.PRACTICE && theme && (
                <div className={screenTransition} style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2,
                }}>
                    {/* Header Controls */}
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '0',
                        right: '0',
                        padding: '0 1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: 10
                    }}>
                        {/* Stop Button */}
                        <button
                            className="btn btn-outline"
                            onClick={handleStopPractice}
                            style={{ padding: '0.5rem 1rem' }}
                        >
                            ✕ Stop
                        </button>

                        {/* Metronome Toggle */}
                        <button
                            className="btn btn-outline"
                            onClick={() => setMetronomeActive(!metronomeActive)}
                            style={{
                                padding: '0.5rem 1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                borderColor: metronomeActive ? theme.colors.primary : 'rgba(255,255,255,0.2)',
                                background: metronomeActive ? `${theme.colors.primary}20` : 'transparent',
                                color: metronomeActive ? theme.colors.primary : 'rgba(255,255,255,0.6)'
                            }}
                        >
                            <span>{metronomeActive ? '🔊' : '🔇'}</span>
                            <span style={{ fontSize: '0.9rem' }}>BPM {bpm}</span>
                        </button>
                    </div>

                    {/* Audio Error */}
                    {audioError && (
                        <div
                            className="glass-card mb-lg"
                            style={{
                                background: 'rgba(239, 68, 68, 0.2)',
                                borderColor: 'rgba(239, 68, 68, 0.5)',
                                padding: '1rem',
                            }}
                        >
                            ⚠️ {audioError}
                        </div>
                    )}

                    {/* ========== RHYTHM VISUALS (Lightsticks / Blasters) ========== */}
                    {screen === SCREEN.PRACTICE && theme.beatVisual === 'lightstick' && (
                        <div style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
                            gap: '100px', height: '160px', marginTop: '40px', marginBottom: '-10px', position: 'relative'
                        }}>
                            {/* Star Burst Effect on Beat 1 */}
                            {metronomeActive && currentBeat === 0 && (
                                <>
                                    <div className="beat-star beat-burst-active" style={{ left: 'calc(50% - 75px)', bottom: '130px', color: '#00ffff' }}>✨</div>
                                    <div className="beat-star beat-burst-active" style={{ left: 'calc(50% - 85px)', bottom: '140px', color: '#ff6bef' }}>⭐</div>
                                    <div className="beat-star beat-burst-active" style={{ left: 'calc(50% + 75px)', bottom: '130px', color: '#ffe066' }}>✨</div>
                                    <div className="beat-star beat-burst-active" style={{ left: 'calc(50% + 85px)', bottom: '140px', color: '#ffffff' }}>⭐</div>
                                </>
                            )}

                            {/* Left Lightstick */}
                            <div style={{
                                width: '50px', height: '150px', transformOrigin: 'bottom center',
                                animation: `swayLeft ${metronomeActive ? (60 / bpm) : 1.8}s ease-in-out infinite`,
                                filter: currentBeat === 0 ? 'brightness(1.5) contrast(1.2)' : 'none',
                                transition: 'filter 0.1s ease'
                            }}>
                                <svg viewBox="0 0 50 150" width="100%" height="100%">
                                    <defs>
                                        <linearGradient id="stickGlowL" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#00ffff" stopOpacity="1" />
                                            <stop offset="40%" stopColor="#ff6bef" stopOpacity="0.9" />
                                            <stop offset="100%" stopColor="#ff2d7f" stopOpacity="0.7" />
                                        </linearGradient>
                                        <filter id="neonBlurL"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                                    </defs>
                                    <rect x="18" y="10" width="14" height="90" rx="7" fill="url(#stickGlowL)" filter="url(#neonBlurL)" />
                                    <circle cx="25" cy="15" r="14" fill="white" fillOpacity={currentBeat === 0 ? 0.9 : 0.4} filter="url(#neonBlurL)" />
                                    <rect x="21" y="100" width="8" height="45" rx="4" fill="#888" />
                                </svg>
                            </div>

                            {/* Right Lightstick */}
                            <div style={{
                                width: '50px', height: '150px', transformOrigin: 'bottom center',
                                animation: `swayRight ${metronomeActive ? (60 / bpm) : 1.8}s ease-in-out infinite`,
                                filter: currentBeat === 0 ? 'brightness(1.5) contrast(1.2)' : 'none',
                                transition: 'filter 0.1s ease'
                            }}>
                                <svg viewBox="0 0 50 150" width="100%" height="100%">
                                    <defs>
                                        <linearGradient id="stickGlowR" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#ffe066" stopOpacity="1" />
                                            <stop offset="40%" stopColor="#ff8a3d" stopOpacity="0.9" />
                                            <stop offset="100%" stopColor="#ff2d7f" stopOpacity="0.7" />
                                        </linearGradient>
                                    </defs>
                                    <rect x="18" y="10" width="14" height="90" rx="7" fill="url(#stickGlowR)" filter="url(#neonBlurL)" />
                                    <circle cx="25" cy="15" r="14" fill="white" fillOpacity={currentBeat === 0 ? 0.9 : 0.4} filter="url(#neonBlurL)" />
                                    <rect x="21" y="100" width="8" height="45" rx="4" fill="#888" />
                                </svg>
                            </div>
                        </div>
                    )}

                    {screen === SCREEN.PRACTICE && theme.beatVisual === 'blasters' && (
                        <div style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
                            gap: '120px', height: '200px', marginTop: '0px', marginBottom: '-10px'
                        }}>
                            {/* Leo's Plasma Blasters */}
                            {[1, 2].map(i => {
                                const isFirstBeat = currentBeat === 0;
                                const isOtherBeat = currentBeat > 0;

                                return (
                                    <div key={i} style={{
                                        width: '70px', height: '140px', transformOrigin: 'bottom center',
                                        position: 'relative',
                                        transform: i === 1 ? 'rotate(-15deg)' : 'rotate(15deg)',
                                        animation: metronomeActive ? (isFirstBeat ? 'shake 0.1s infinite' : 'shake-light 0.1s ease-out') : 'none'
                                    }}>
                                        {/* Muzzle Flash (Strong on Beat 1, Subtle Spark on others) */}
                                        {metronomeActive && (
                                            <div key={`${currentBeat}-${i}`} style={{
                                                position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)',
                                                width: isFirstBeat ? '100px' : '40px',
                                                height: isFirstBeat ? '100px' : '40px',
                                                background: `radial-gradient(circle, #fff 0%, ${isFirstBeat ? '#7b2cbf' : '#00d4ff'} 70%, transparent 100%)`,
                                                borderRadius: '50%',
                                                filter: 'blur(3px)',
                                                opacity: isFirstBeat ? 1 : 0.8,
                                                animation: isFirstBeat ? 'starBurst 0.25s ease-out' : 'flareGlow 0.15s ease-out',
                                                zIndex: 1
                                            }} />
                                        )}

                                        <svg viewBox="0 0 60 120" width="100%" height="100%" style={{ overflow: 'visible' }}>
                                            <defs>
                                                <filter id="neonBlurQuest">
                                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                                    <feMerge>
                                                        <feMergeNode in="blur" />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>
                                            </defs>

                                            {/* Gun Body */}
                                            <rect x="15" y="30" width="30" height="70" rx="4" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
                                            <rect x="10" y="45" width="40" height="20" rx="2" fill="#333" />

                                            {/* Barrel (Glows on every beat) */}
                                            <rect x="25" y="0" width="10" height="40" fill={metronomeActive ? (isFirstBeat ? '#fff' : '#00d4ff') : '#444'} style={{ transition: 'fill 0.05s' }} />

                                            {/* Energy Core - Fixed visibility and rhythmic pulse */}
                                            <circle
                                                cx="30"
                                                cy="55"
                                                r={metronomeActive ? (isFirstBeat ? 16 : 12) : 10}
                                                fill={metronomeActive ? (isFirstBeat ? '#ffffff' : '#00d4ff') : '#222'}
                                                filter="url(#neonBlurQuest)"
                                                style={{
                                                    transition: 'all 0.05s ease-out',
                                                    opacity: metronomeActive ? 1 : 0.4
                                                }}
                                            />

                                            {/* Handle */}
                                            <rect x="22" y="100" width="16" height="30" rx="4" fill="#111" />
                                        </svg>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Timer Ring */}
                    <RhythmTimer
                        progress={progress}
                        theme={selectedTheme}
                        elapsedTime={elapsedSeconds}
                        targetTime={30}
                        isActive={isActive}
                        audioLevel={audioLevel}
                        isMetronomeActive={metronomeActive}
                        metronomeBeat={currentBeat}
                    />

                    {/* Audio Visualizer */}
                    <div className="mt-lg">
                        <AudioBars
                            frequencyData={frequencyData}
                            theme={selectedTheme}
                            isActive={isActive}
                        />
                    </div>

                    {/* Slider Control (Only if active) */}
                    {metronomeActive && (
                        <div className="mt-md flex-center gap-md" style={{ animation: 'fadeIn 0.3s ease' }}>
                            <button
                                className="btn btn-outline"
                                style={{ width: '30px', height: '30px', padding: 0 }}
                                onClick={() => setBpm(b => Math.max(40, b - 5))}
                            >-</button>
                            <input
                                type="range"
                                min="40"
                                max="200"
                                value={bpm}
                                onChange={(e) => setBpm(Number(e.target.value))}
                                style={{ width: '120px', accentColor: theme.colors.primary }}
                            />
                            <button
                                className="btn btn-outline"
                                style={{ width: '30px', height: '30px', padding: 0 }}
                                onClick={() => setBpm(b => Math.min(200, b + 5))}
                            >+</button>
                        </div>
                    )}

                    {/* Status Message */}
                    <p
                        className="text-muted mt-xl"
                        style={{
                            opacity: isActive ? 0 : 1,
                            transition: 'opacity 0.3s ease',
                        }}
                    >
                        {isListening ? 'Play something to continue...' : 'Starting...'}
                    </p>
                </div>
            )}

            {/* ========== REWARD MODAL ========== */}
            {currentReward && (
                <LootBoxReveal
                    reward={currentReward.reward}
                    theme={selectedTheme}
                    streakBonus={currentReward.streakBonus}
                    onClose={handleRewardClose}
                />
            )}

            {/* ========== PERMISSION ERROR MODAL ========== */}
            {screen === SCREEN.PRACTICE && audioError && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.9)',
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    <div className="glass-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center', border: '1px solid var(--text-error, #ff4d4d)' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎙️🚫</div>
                        <h2 className="text-secondary mb-md">Microphone Disabled</h2>
                        <p className="text-muted mb-lg">
                            Rhythm & Loot needs to hear you play to track progress.
                            <br /><span style={{ fontSize: '0.8em', color: 'var(--text-error, #ff4d4d)' }}>Error: {audioError}</span>
                        </p>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', marginBottom: '20px', textAlign: 'left' }}>
                            <p className="text-sm text-secondary mb-xs"><strong>How to enable:</strong></p>
                            <ol className="text-xs text-muted" style={{ paddingLeft: '20px', margin: 0 }}>
                                <li className="mb-xs">Open device <strong>Settings</strong></li>
                                <li className="mb-xs">Go to <strong>Apps</strong> &gt; <strong>Rhythm & Loot</strong></li>
                                <li className="mb-xs">Tap <strong>Permissions</strong></li>
                                <li>Enable <strong>Microphone</strong></li>
                            </ol>
                        </div>
                        <div className="flex-col gap-md">
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => startListening()}
                            >
                                I've Enabled It, Retry
                            </button>
                            <button
                                className="btn btn-outline w-100"
                                onClick={() => {
                                    handleStopPractice();
                                }}
                            >
                                Cancel Practice
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========== INVENTORY MODAL ========== */}
            {showInventory && (
                <InventoryGallery
                    inventory={inventory}
                    theme={selectedTheme}
                    earnedBadges={earnedBadges}
                    equippedItems={equippedItems}
                    toggleEquip={toggleEquip}
                    onClose={() => setShowInventory(false)}
                />
            )}
        </div>
    );
}

export default App;
