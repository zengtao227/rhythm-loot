import { useState, useEffect, useCallback } from 'react';
import { themes } from './themes/themeConfig';
import { useAudioTracker } from './hooks/useAudioTracker';
import { useInventory } from './hooks/useInventory';
import { useMetronome } from './hooks/useMetronome';
import { injectAnimations } from './utils/uiEffects';
import ProfileCard from './components/UI/ProfileCard';
import TimerCircle from './components/UI/TimerCircle';
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

                    {/* Profile Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        maxWidth: '700px',
                        margin: '0 auto',
                        width: '100%',
                    }}>
                        <ProfileCard
                            themeId="blink"
                            selected={selectedTheme === 'blink'}
                            onClick={() => setSelectedTheme('blink')}
                            streak={streak} // Note: Blink streak
                        />
                        <ProfileCard
                            themeId="quest"
                            selected={selectedTheme === 'quest'}
                            onClick={() => setSelectedTheme('quest')}
                            streak={streak} // Note: Quest streak
                        />
                        <ProfileCard
                            themeId="fortnite"
                            selected={selectedTheme === 'fortnite'}
                            onClick={() => setSelectedTheme('fortnite')}
                            streak={streak} // Shares streak logic with Quest ideally, but for MVP it's separate or same
                        />
                        <ProfileCard
                            themeId="cyberpunk"
                            selected={selectedTheme === 'cyberpunk'}
                            onClick={() => setSelectedTheme('cyberpunk')}
                            streak={streak}
                        />
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

                    {/* ===== Blink Lightsticks (above TimerCircle) ===== */}
                    {selectedTheme === 'blink' && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            gap: '80px',
                            height: '120px',
                            marginTop: '60px',
                            marginBottom: '-10px'
                        }}>
                            {/* Left Lightstick */}
                            <div style={{
                                width: '60px',
                                height: '110px',
                                transformOrigin: 'bottom center',
                                transform: metronomeActive
                                    ? `rotate(${currentBeat % 2 === 0 ? '-35deg' : '5deg'})`
                                    : 'rotate(-15deg)',
                                transition: metronomeActive
                                    ? 'transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    : 'transform 0.6s ease-in-out',
                                filter: `drop-shadow(0 0 ${metronomeActive && currentBeat === 0 ? '18px' : '8px'} #ff2d7f)`
                            }}>
                                <svg viewBox="0 0 60 110" width="100%" height="100%">
                                    {/* Handle */}
                                    <rect x="25" y="55" width="10" height="50" rx="5" fill="#2a2a2a" stroke="#555" strokeWidth="1" />
                                    {/* Heart head */}
                                    <path d="M30 58 C 10 48, 5 25, 30 42 C 55 25, 50 48, 30 58"
                                        fill="#ff6b9d" stroke="#ffb3d0" strokeWidth="2" strokeLinejoin="round" />
                                    {/* Inner glow circle */}
                                    <circle cx="30" cy="38" r="7" fill="white" fillOpacity="0.7" />
                                    {/* Sparkle dots */}
                                    <circle cx="18" cy="28" r="2" fill="white" fillOpacity={metronomeActive ? '0.9' : '0.3'} />
                                    <circle cx="42" cy="28" r="2" fill="white" fillOpacity={metronomeActive ? '0.9' : '0.3'} />
                                </svg>
                            </div>

                            {/* Right Lightstick */}
                            <div style={{
                                width: '60px',
                                height: '110px',
                                transformOrigin: 'bottom center',
                                transform: metronomeActive
                                    ? `rotate(${currentBeat % 2 === 0 ? '35deg' : '-5deg'})`
                                    : 'rotate(15deg)',
                                transition: metronomeActive
                                    ? 'transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    : 'transform 0.6s ease-in-out',
                                filter: `drop-shadow(0 0 ${metronomeActive && currentBeat === 0 ? '18px' : '8px'} #ff2d7f)`
                            }}>
                                <svg viewBox="0 0 60 110" width="100%" height="100%">
                                    {/* Handle */}
                                    <rect x="25" y="55" width="10" height="50" rx="5" fill="#2a2a2a" stroke="#555" strokeWidth="1" />
                                    {/* Heart head */}
                                    <path d="M30 58 C 10 48, 5 25, 30 42 C 55 25, 50 48, 30 58"
                                        fill="#ff6b9d" stroke="#ffb3d0" strokeWidth="2" strokeLinejoin="round" />
                                    {/* Inner glow circle */}
                                    <circle cx="30" cy="38" r="7" fill="white" fillOpacity="0.7" />
                                    {/* Sparkle dots */}
                                    <circle cx="18" cy="28" r="2" fill="white" fillOpacity={metronomeActive ? '0.9' : '0.3'} />
                                    <circle cx="42" cy="28" r="2" fill="white" fillOpacity={metronomeActive ? '0.9' : '0.3'} />
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* Timer Ring */}
                    <TimerCircle
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
