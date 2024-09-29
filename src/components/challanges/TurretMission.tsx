import React from 'react';
import { useNavigate } from 'react-router-dom';
import MissionTemplate from "../templates/MissionTemplate.tsx";
import TurretDefenceGame from "../games/TurretDefenceGame.tsx";


const MalwareRemovalMission: React.FC = () => {
    const navigate = useNavigate();

    const missionContent = (
        <>
            <div>
                <img
                    src="https://i.ytimg.com/vi/FV3MhMRn78M/maxresdefault.jpg"
                    alt="Alien Invasion"
                    style={{width: '500px', height: '100%'}}
                />
            </div>
            <h1>Mission 4: Turret Aim – Defend Earth’s Last Line</h1>
            <p>Outstanding work! The Orion Shield System is back online, and we’re finally receiving data on the alien
                fleet. But the situation is dire—our advanced defense systems have been compromised and infected with
                alien code. We don’t have time to clean them up before the invasion begins.</p>

            <p>There is still hope. We have an older set of turrets—disconnected from the internet, and therefore safe
                from the alien virus. The problem? These turrets were designed decades ago, and their targeting systems
                are outdated. We need to write the <strong>aiming scripts</strong> from scratch to get them operational
                in time to defend Earth.</p>

            <p>Your mission is critical: write a custom aiming algorithm to control the turrets and target the incoming
                alien ships with precision. The data from the restored satellites will guide the turrets, but only if we
                can get them aiming correctly. Your code will decide whether the turrets can track and destroy the
                invaders.</p>

            <p>The invasion is approaching fast, and the fate of Earth rests on your ability to get these turrets firing
                accurately. The aliens won’t wait, and neither can we.</p>

            <p><strong>Get those turrets online.</strong> The final defense of Earth is in your hands.</p>

        </>
    );

    return (
        <MissionTemplate
            audioUrl={'/src/assets/4turret.mp3'}
            missionContent={missionContent}
            challengeComponent={<TurretDefenceGame maxAliens={11} onWin={() => {
                return navigate('/win-game')
            }}/>}
        />
    );
};

export default MalwareRemovalMission;
