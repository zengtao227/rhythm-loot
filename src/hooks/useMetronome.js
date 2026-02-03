
import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * useMetronome Hook
 * 
 * Implements a precise metronome using the Web Audio API.
 * 
 * Features:
 * - Precise timing using AudioContext.currentTime (lookahead scheduling).
 * - Theme-based sounds.
 * - Visual callback for UI synchronization.
 * 
 * @param {number} bpm - Beats per minute (default: 100)
 * @param {string} theme - 'blink' or 'quest' (determines sound)
 * @param {boolean} isPlaying - Controls start/stop
 * @returns {Object} { currentBeat } - The current beat number (1-4) for visual sync
 */
export function useMetronome(bpm = 100, theme = 'blink', isPlaying = false) {
    const audioContextRef = useRef(null);
    const nextNoteTimeRef = useRef(0.0);
    const timerIDRef = useRef(null);
    const [currentBeat, setCurrentBeat] = useState(0); // 0-3 (Measure of 4)

    // Lookahead constants
    const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
    const scheduleAheadTime = 0.1; // How far ahead to schedule audio (in seconds)

    // Sound buffers (Using oscillators for MVP, can upgrade to samples later)
    const playClick = useCallback((time, beat) => {
        if (!audioContextRef.current) return;

        const osc = audioContextRef.current.createOscillator();
        const envelope = audioContextRef.current.createGain();

        osc.connect(envelope);
        envelope.connect(audioContextRef.current.destination);

        // Sound Design based on Theme
        if (theme === 'blink') {
            // Electronic Tick (Higher pitch, sharp)
            if (beat === 0) {
                // Downbeat (High)
                osc.frequency.value = 1200;
            } else {
                // Upbeat
                osc.frequency.value = 800;
            }
            osc.type = 'square'; // Electronic feel

            // Short envelope
            envelope.gain.setValueAtTime(0.1, time);
            envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
        } else {
            // Quest Tick (Wood/Mechanical)
            if (beat === 0) {
                osc.frequency.value = 400; // Lower woodblock sound
            } else {
                osc.frequency.value = 300;
            }
            osc.type = 'triangle'; // Softer, more organic

            // Perky envelope
            envelope.gain.setValueAtTime(0.1, time);
            envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        }

        osc.start(time);
        osc.stop(time + 0.1);

        // Visual Sync (Scheduled via state, slightly delayed to match audio perception)
        // Note: State updates might not be perfectly frame-accurate compared to Audio, 
        // but close enough for UI Pulse.
        const drawTime = (time - audioContextRef.current.currentTime) * 1000;
        setTimeout(() => {
            setCurrentBeat(beat);
        }, Math.max(0, drawTime));

    }, [theme]);

    // Scheduler
    const nextNote = useCallback(() => {
        const secondsPerBeat = 60.0 / bpm;
        nextNoteTimeRef.current += secondsPerBeat;
        // Increment beat number (0-3)
        // beatRef.current = (beatRef.current + 1) % 4; 
        // Note: We pass the calculated beat to playClick based on time, simpler for now to track locally if needed
    }, [bpm]);

    // The loop driver
    const scheduler = useCallback(() => {
        // While there are notes that will need to play before the next interval, 
        // schedule them and advance the pointer.
        let beatCounter = currentBeat; // This logic needs to be robust, simplified for MVP loop

        while (nextNoteTimeRef.current < audioContextRef.current.currentTime + scheduleAheadTime) {
            // Calculate beat index based on time or simplified counter? 
            // Ideally we just cycle 0-3
            beatCounter = (beatCounter + 1) % 4;

            playClick(nextNoteTimeRef.current, beatCounter);
            nextNote();
        }
        timerIDRef.current = setTimeout(scheduler, lookahead);
    }, [nextNote, playClick, currentBeat]); // Dependency on currentBeat is tricky here for closure...

    // FIX: Ref-based beat counter to avoid closure staleness in setTimeout loop
    const beatCounterRef = useRef(0);

    const schedulerRobust = useCallback(() => {
        while (nextNoteTimeRef.current < audioContextRef.current.currentTime + scheduleAheadTime) {
            playClick(nextNoteTimeRef.current, beatCounterRef.current);
            nextNote();
            beatCounterRef.current = (beatCounterRef.current + 1) % 4;
        }
        timerIDRef.current = setTimeout(schedulerRobust, lookahead);
    }, [nextNote, playClick]);


    // Start/Stop Logic
    useEffect(() => {
        if (isPlaying) {
            // Initialize Audio Context (must be user interactions usually, assuming this hook is triggered by a button)
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }

            // Resume if suspended
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }

            // Reset timing
            nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.1;
            beatCounterRef.current = 0;

            schedulerRobust();

            return () => {
                if (timerIDRef.current) clearTimeout(timerIDRef.current);
            };
        } else {
            if (timerIDRef.current) clearTimeout(timerIDRef.current);
        }
    }, [isPlaying, schedulerRobust]);


    return {
        currentBeat, // Consumer uses this to trigger visual effects
    };
}

export default useMetronome;
