import React from 'react';
import { useNavigate } from 'react-router-dom';
import MissionTemplate from "../templates/MissionTemplate.tsx";
import RegexGame from "../games/RegexGame.tsx";


const ExampleMission: React.FC = () => {
    const navigate = useNavigate(); // Initialize the navigation hook

    const missionContent = (
        <>
            <div>
                <img
                    src="https://www.itu.int/hub/wp-content/uploads/sites/4/2023/10/AdobeStock_594956182.jpg.optimal.jpg"
                    alt="Alien Invasion"
                    style={{width: '500px', height: '100%'}}
                />
            </div>
            <h1>Mission 2: Orion Shield System – Earth's Critical Last Line</h1>
            <p>Great job on conquering VimSnake! You’ve proven your worth, but the battle is far from over. The stakes
                are getting higher, and now it's time for the next mission.</p>

            <p>The world teeters on the brink of destruction. Alien forces are assembling just beyond the atmosphere,
                ready for a full-scale invasion. Earth’s defenses have been crippled. Our entire network of
                ground-to-space turrets, missile systems, and tracking technology has gone dark. The key to restoring
                them? The <strong>Orion Shield Satellite System</strong>.</p>

            <p>The Orion satellites were designed to be Earth’s first line of defense, tracking any threats before they
                could reach the atmosphere. But now, the alien fleet has sabotaged the system, leaving us blind to their
                movements. Without Orion, Earth is an easy target.</p>

            <p>Your mission is critical: break into the alien-controlled Orion Shield System and find the hidden codes
                that are locking us out. The aliens have buried their code deep inside the system, hiding it in plain
                sight. To regain control, you’ll need to search through layers of code using <strong>regular expressions
                    (RegEx)</strong> to find these secret keys and unlock the satellite system.</p>

            <p>Be sharp and precise. The next challenge is a RegEx search task—identify the hidden patterns and crack
                the alien's security before the invasion begins.</p>

            <p><strong>Time is running out.</strong> If we can’t regain control of the satellites, Earth will be left
                defenseless. It’s up to you to break into the system and prepare us for the battle ahead.</p>

        </>
    );

    return (
        <MissionTemplate
            audioUrl="2regexp.mp3"
            missionContent={missionContent}
            challengeComponent={<RegexGame onWin={() => {
                return navigate('/malware-mission')
            }}/>}
        />
    );
};

export default ExampleMission;
