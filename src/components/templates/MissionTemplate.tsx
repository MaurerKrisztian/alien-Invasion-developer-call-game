import React, { useRef, useState, ReactElement } from 'react';
import {IGamePropsBase} from "../games/interfaces/gameprops.interface.ts";

interface MissionTemplateProps<T extends IGamePropsBase> {
    audioUrl?: string; // Optional audio URL
    missionContent: React.ReactNode; // Static content for the mission (e.g., mission story)
    challengeComponent?: ReactElement<T>; // Optional challenge component that must implement IBaseGameProp
}

const MissionTemplate = <T extends IGamePropsBase>({ audioUrl, missionContent, challengeComponent }: MissionTemplateProps<T>) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [challengeStarted, setChallengeStarted] = useState(false);

    const handlePlayAudio = () => {
        if (audioRef.current) {
            audioRef.current.play(); // Play the provided audio
        }
    };

    const handleStartChallenge = () => {
        setChallengeStarted(true); // Switch to challenge view
    };

    return (
        <div style={containerStyle}>
            {!challengeStarted ? (
                <>
                    <div style={contentStyle}>
                        {missionContent} {/* Render static mission content */}
                    </div>
                    {audioUrl && (
                        <>
                            <button style={readBtnStyle} onClick={handlePlayAudio}>
                                Play Audio
                            </button>
                            <audio ref={audioRef} src={audioUrl} />
                        </>
                    )}
                    {challengeComponent && ( // Only show "Start Challenge" button if challengeComponent is provided
                        <button style={startBtnStyle} onClick={handleStartChallenge}>
                            Start Challenge
                        </button>
                    )}
                </>
            ) : (
                challengeComponent && ( // Only render challenge if it's provided
                    <div style={challengeContainerStyle}>
                        {React.cloneElement(challengeComponent)} {/* Clone and pass props if needed */}
                    </div>
                )
            )}
        </div>
    );
};

// Styling for the MissionTemplate
const containerStyle = {
    textAlign: 'center',
    color: '#00ff00',
    backgroundColor: '#0e0e0e',
    padding: '50px',
    border: '2px solid #00ff00',
    boxShadow: '0 0 20px #00ff00',
    marginTop: '50px',
} as React.CSSProperties;

const contentStyle = {
    marginBottom: '30px',
} as React.CSSProperties;

const readBtnStyle = {
    padding: '10px 20px',
    fontSize: '1.2em',
    backgroundColor: '#32cd32',
    color: '#0e0e0e',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px',
} as React.CSSProperties;

const startBtnStyle = {
    padding: '10px 20px',
    fontSize: '1.2em',
    backgroundColor: '#00ff00',
    color: '#0e0e0e',
    border: 'none',
    cursor: 'pointer',
} as React.CSSProperties;

const challengeContainerStyle = {
    marginTop: '20px',
} as React.CSSProperties;

export default MissionTemplate;
