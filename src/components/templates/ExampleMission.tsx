import React from 'react';
import MissionTemplate from './MissionTemplate.tsx';
import SnakeGame from "../games/SnakeGame.tsx"; // Import the template
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook


const ExampleMission: React.FC = () => {
    const navigate = useNavigate(); // Initialize the navigation hook

    const missionContent = (
        <>
            <h1>Alien Invasion: Developer's Call</h1>
            <p>
                The year is 2054, and Earth’s greatest enemy isn’t a weapon—it’s code.
                {/* Additional mission story here */}
            </p>
        </>
    );

    return (
        <MissionTemplate
            audioUrl="/src/assets/startstory.mp3"
            missionContent={missionContent}
            challengeComponent={<SnakeGame winningScore={3} onWin={()=>{return navigate('/')}}/>}
        />
    );
};

export default ExampleMission;
