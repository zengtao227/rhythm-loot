/**
 * UI Effects utilities for animations, sounds, and haptic feedback
 */

/**
 * Trigger device vibration (if supported)
 * @param {number|number[]} pattern - Vibration pattern in milliseconds
 */
export function vibrate(pattern = 200) {
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
    }
}

/**
 * Play a simple beep sound using Web Audio API
 * @param {number} frequency - Frequency in Hz
 * @param {number} duration - Duration in milliseconds
 * @param {number} volume - Volume (0-1)
 */
export function playBeep(frequency = 440, duration = 100, volume = 0.3) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
        console.warn('Audio playback failed:', error);
    }
}

/**
 * Play loot box opening sound effect
 */
export function playLootBoxSound(rarity = 'common') {
    const sounds = {
        common: { freq: 523, duration: 150 },      // C5
        uncommon: { freq: 659, duration: 200 },    // E5
        rare: { freq: 784, duration: 250 },        // G5
        epic: { freq: 880, duration: 300 },        // A5
        legendary: { freq: 1047, duration: 400 }   // C6
    };

    const sound = sounds[rarity] || sounds.common;
    
    // Play ascending notes for higher rarities
    if (rarity === 'legendary' || rarity === 'epic') {
        playBeep(sound.freq * 0.5, 100, 0.2);
        setTimeout(() => playBeep(sound.freq * 0.75, 100, 0.25), 100);
        setTimeout(() => playBeep(sound.freq, sound.duration, 0.3), 200);
    } else {
        playBeep(sound.freq, sound.duration, 0.3);
    }
}

/**
 * Trigger screen shake effect
 * @param {number} intensity - Shake intensity (1-3)
 * @param {number} duration - Duration in milliseconds
 */
export function screenShake(intensity = 2, duration = 500) {
    const body = document.body;
    body.style.animation = `screenShake${intensity} ${duration}ms ease-in-out`;
    
    setTimeout(() => {
        body.style.animation = '';
    }, duration);
}

/**
 * Create particle burst effect at position
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {string} color - Particle color
 */
export function createParticleBurst(x, y, color = '#ff2d7f') {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 100 + Math.random() * 100;
        
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.animation = `particleBurst 0.8s ease-out forwards`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        container.appendChild(particle);
    }

    // Clean up
    setTimeout(() => {
        document.body.removeChild(container);
    }, 1000);
}

/**
 * Add CSS animations dynamically
 */
export function injectAnimations() {
    if (document.getElementById('ui-effects-styles')) return;

    const style = document.createElement('style');
    style.id = 'ui-effects-styles';
    style.textContent = `
        @keyframes screenShake1 {
            0%, 100% { transform: translate(0, 0); }
            10%, 30%, 50%, 70%, 90% { transform: translate(-2px, 2px); }
            20%, 40%, 60%, 80% { transform: translate(2px, -2px); }
        }
        
        @keyframes screenShake2 {
            0%, 100% { transform: translate(0, 0); }
            10%, 30%, 50%, 70%, 90% { transform: translate(-5px, 5px); }
            20%, 40%, 60%, 80% { transform: translate(5px, -5px); }
        }
        
        @keyframes screenShake3 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            10%, 30%, 50%, 70%, 90% { transform: translate(-8px, 8px) rotate(-1deg); }
            20%, 40%, 60%, 80% { transform: translate(8px, -8px) rotate(1deg); }
        }
        
        @keyframes particleBurst {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(var(--tx), var(--ty)) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes slideInFromRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideInFromLeft {
            from {
                transform: translateX(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutToLeft {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(-100%);
                opacity: 0;
            }
        }
        
        @keyframes slideOutToRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes scaleIn {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        .screen-transition-enter {
            animation: slideInFromRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .screen-transition-exit {
            animation: slideOutToLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
}
