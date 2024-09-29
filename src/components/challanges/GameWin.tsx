import React from 'react';
import MissionTemplate from "../templates/MissionTemplate.tsx";


const GameWin: React.FC = () => {

    const missionContent = (
        <>

            <div>
                <img
                    src="https://i.postimg.cc/qB9Q1rmy/aliens.webp"
                    alt="Alien Invasion"
                    style={{width: '500px', height: '100%'}}
                />
            </div>

            <h1>Final Mission Complete: Earth’s Victory… or Was It?</h1>

            <p>The last alien ship explodes into a thousand pieces, its debris scattering across the dark sky. The
                turrets fall silent. You’ve done it—Earth is safe, the invasion has been stopped, and humanity has a
                fighting chance again.</p>

            <p>Or so it seems.</p>

            <p>As the dust settles, the command center crackles to life. A transmission—one you’ve never heard
                before—cuts through the static.</p>

            <p className="transmission">“Impressive work, developer. But this was only a simulation.”</p>

            <p>A chill runs down your spine. The alien ships, the malware, the turrets… none of it was real?</p>

            <p className="transmission">“This was merely a test, a way to see who would be capable when
                the <strong>real</strong> invasion comes. You’ve proven yourself, but the true battle is just
                beginning.”</p>


            <h2>**To be continued...**</h2>

        </>
    );

    return (
        <MissionTemplate
            missionContent={missionContent}
            audioUrl={'/src/assets/5win.mp3'}
        />
    );
};

export default GameWin;
