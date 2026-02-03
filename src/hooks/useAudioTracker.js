import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for audio detection and tracking
 * Uses Web Audio API to detect when the violin is being played
 */
export function useAudioTracker(options = {}) {
    const {
        silenceThreshold = 0.02,    // Audio level below this is considered silence
        silenceTimeout = 5000,       // Pause timer after this many ms of silence
        onActiveChange = null,       // Callback when active state changes
    } = options;

    const [isListening, setIsListening] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);
    const [error, setError] = useState(null);
    const [frequencyData, setFrequencyData] = useState(new Uint8Array(64));

    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const streamRef = useRef(null);
    const animationFrameRef = useRef(null);
    const silenceTimerRef = useRef(null);
    const lastActiveTimeRef = useRef(Date.now());

    const startListening = useCallback(async () => {
        try {
            setError(null);

            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                }
            });

            streamRef.current = stream;

            // Create audio context and analyser
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = audioContext;

            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.8;
            analyserRef.current = analyser;

            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);

            setIsListening(true);

            // Start analysis loop
            const analyze = () => {
                if (!analyserRef.current) return;

                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(dataArray);

                // Calculate average audio level (normalized 0-1)
                const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 255;
                setAudioLevel(average);
                setFrequencyData(dataArray.slice(0, 64));

                // Check if sound is detected
                if (average > silenceThreshold) {
                    lastActiveTimeRef.current = Date.now();

                    if (!isActive) {
                        setIsActive(true);
                        if (silenceTimerRef.current) {
                            clearTimeout(silenceTimerRef.current);
                            silenceTimerRef.current = null;
                        }
                    }
                } else {
                    // Check if silence has persisted long enough
                    const silenceDuration = Date.now() - lastActiveTimeRef.current;

                    if (isActive && silenceDuration >= silenceTimeout) {
                        setIsActive(false);
                    }
                }

                animationFrameRef.current = requestAnimationFrame(analyze);
            };

            analyze();

        } catch (err) {
            console.error('Microphone access error:', err);
            setError(err.message || 'Microphone access denied');
            setIsListening(false);
        }
    }, [silenceThreshold, silenceTimeout, isActive]);

    const stopListening = useCallback(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }

        analyserRef.current = null;
        setIsListening(false);
        setIsActive(false);
        setAudioLevel(0);
    }, []);

    // Notify on active state change
    useEffect(() => {
        if (onActiveChange) {
            onActiveChange(isActive);
        }
    }, [isActive, onActiveChange]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopListening();
        };
    }, [stopListening]);

    return {
        isListening,
        isActive,
        audioLevel,
        frequencyData,
        error,
        startListening,
        stopListening,
    };
}

export default useAudioTracker;
