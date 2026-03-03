import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';

export const AdaptationComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Smooth entry animation
    const entryProgress = spring({
        frame,
        fps,
        config: { damping: 12 },
    });

    // Flowing lines animation
    const lineOffset = (frame % 60) / 60; // 0 to 1 over 2 seconds

    // Morphing shape animation
    const morphProgress = interpolate(
        Math.sin(frame / 15),
        [-1, 1],
        [0, 1]
    );

    return (
        <AbsoluteFill style={{ backgroundColor: '#0f172a', overflow: 'hidden' }}>
            {/* Grid Background */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
						linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
						linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
					`,
                    backgroundSize: '50px 50px',
                    backgroundPosition: `0px ${lineOffset * 50}px`,
                    opacity: interpolate(entryProgress, [0, 1], [0, 0.5]),
                }}
            />

            {/* Central Core (The "Source Content") */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '30%',
                    transform: `translate(-50%, -50%) scale(${interpolate(entryProgress, [0, 1], [0, 1])})`,
                }}
            >
                <div
                    style={{
                        width: 150,
                        height: 150,
                        background: 'linear-gradient(135deg, #3b82f6, #ec4899)',
                        borderRadius: interpolate(morphProgress, [0, 1], [20, 75]), // Morphs square to circle
                        boxShadow: '0 0 50px rgba(59, 130, 246, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: 24,
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',
                    }}
                >
                    DATA
                </div>
            </div>

            {/* Radiating Lines (Adaptation Process) */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <defs>
                    <linearGradient id="lineGrad1" x1="30%" y1="50%" x2="70%" y2="20%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGrad2" x1="30%" y1="50%" x2="70%" y2="50%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGrad3" x1="30%" y1="50%" x2="70%" y2="80%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Top line mapping */}
                <path
                    d="M 576 540 C 900 300, 1100 200, 1344 216"
                    fill="none"
                    stroke="url(#lineGrad1)"
                    strokeWidth="4"
                    strokeDasharray="20 10"
                    strokeDashoffset={-frame * 5}
                    style={{ opacity: interpolate(entryProgress, [0, 1], [0, 1]) }}
                />
                {/* Middle line mapping */}
                <path
                    d="M 576 540 C 900 540, 1100 540, 1344 540"
                    fill="none"
                    stroke="url(#lineGrad2)"
                    strokeWidth="4"
                    strokeDasharray="20 10"
                    strokeDashoffset={-frame * 4}
                    style={{ opacity: interpolate(entryProgress, [0, 1], [0, 1]) }}
                />
                {/* Bottom line mapping */}
                <path
                    d="M 576 540 C 900 780, 1100 880, 1344 864"
                    fill="none"
                    stroke="url(#lineGrad3)"
                    strokeWidth="4"
                    strokeDasharray="20 10"
                    strokeDashoffset={-frame * 6}
                    style={{ opacity: interpolate(entryProgress, [0, 1], [0, 1]) }}
                />
            </svg>

            {/* Target Platforms (Architectural, LED, Curved) */}

            {/* Target 1: Architectual Facade (Tall rectangle) */}
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '70%',
                    width: 120,
                    height: 240,
                    border: '2px solid rgba(255,255,255,0.2)',
                    borderRadius: 8,
                    backdropFilter: 'blur(10px)',
                    background: 'linear-gradient(180deg, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0))',
                    transform: `
						translate(-50%, -50%) 
						perspective(500px) rotateY(-15deg)
						translateY(${Math.sin(frame / 20) * 10}px)
					`,
                    opacity: interpolate(entryProgress, [0.5, 1], [0, 1]),
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}
            >
                {/* Simulated content blocks on facade */}
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} style={{
                        flex: 1,
                        background: `rgba(236,72,153,${Math.max(0.1, Math.sin(frame / 10 + i) * 0.5)})`,
                        margin: '2px 0'
                    }} />
                ))}
            </div>

            {/* Target 2: Standard LED Screen */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '70%',
                    width: 200,
                    height: 112,
                    border: '2px solid rgba(255,255,255,0.2)',
                    borderRadius: 8,
                    backdropFilter: 'blur(10px)',
                    background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0))',
                    transform: `
						translate(-50%, -50%)
						translateY(${Math.sin(frame / 25 + 1) * 10}px)
					`,
                    opacity: interpolate(entryProgress, [0.6, 1], [0, 1]),
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    overflow: 'hidden'
                }}
            >
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: `radial-gradient(circle at ${50 + Math.sin(frame / 15) * 20}% ${50 + Math.cos(frame / 15) * 20}%, rgba(139, 92, 246, 0.5), transparent)`
                }} />
            </div>

            {/* Target 3: Curved Surface */}
            <div
                style={{
                    position: 'absolute',
                    top: '80%',
                    left: '70%',
                    width: 250,
                    height: 80,
                    border: '2px solid rgba(255,255,255,0.2)',
                    borderRadius: '40px 40px 10px 10px',
                    backdropFilter: 'blur(10px)',
                    background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0))',
                    transform: `
						translate(-50%, -50%)
						perspective(500px) rotateX(20deg)
						translateY(${Math.sin(frame / 22 + 2) * 10}px)
					`,
                    opacity: interpolate(entryProgress, [0.7, 1], [0, 1]),
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    overflow: 'hidden'
                }}
            >
                {/* Simulated text strip */}
                <div style={{
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    color: 'rgba(6,182,212,0.8)',
                    fontFamily: 'monospace',
                    fontSize: 20,
                    top: '50%',
                    transform: `translateY(-50%) translateX(${-(frame * 3) % 400 + 250}px)`
                }}>
                    ADAPTIVE CONTENT RENDERING &gt; &gt; &gt;
                </div>
            </div>

        </AbsoluteFill>
    );
};
