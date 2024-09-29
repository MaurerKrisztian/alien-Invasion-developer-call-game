import React from 'react';
import SnakeGame from "../games/SnakeGame.tsx";
import { useNavigate } from 'react-router-dom';
import MissionTemplate from "../templates/MissionTemplate.tsx";


const VimSnakeMission: React.FC = () => {
    const navigate = useNavigate();

    const missionContent = (
        <>

            <div>
                <img
                    src="https://i.postimg.cc/qB9Q1rmy/aliens.webp"
                    alt="Alien Invasion"
                    style={{width: '500px', height: '100%'}}
                />
            </div>

            <h1>Alien Invasion: Developer's Call</h1>

            <p>The year is 2054, and humanity’s greatest enemy isn’t armed with guns or bombs—it’s armed with code.</p>

            <p>When the alien ships appeared in the sky, they didn’t fire a single shot. Instead, they took control.
                Power grids failed, satellites went offline, and in a matter of hours, the world was plunged into
                darkness. The alien code is flawless, and now our very survival hinges on one thing—our ability to fight
                back in the digital realm.</p>

            <p>In desperation, the government has called upon its last line of defense: developers. Only those with the
                sharpest coding skills can turn the tide of this war. But there’s a test. To join the resistance, you
                must prove yourself by scoring at least 10 in <strong>VimSnake</strong>.</p>

            <p>The clock is ticking, and the world needs you. Are you ready to prove you have what it takes?</p>


        </>
    );

    return (
        <MissionTemplate
            audioUrl="1intro.mp3"
            missionContent={missionContent}
            challengeComponent={<SnakeGame winningScore={10} onWin={() => {
                return navigate('/regexp-mission')
            }}/>}
        />
    );
};

export default VimSnakeMission;
