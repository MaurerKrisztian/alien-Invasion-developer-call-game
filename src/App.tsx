import React from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VimSnakeMission from "./components/challanges/VimSnakeMission";
import RegexpMission from "./components/challanges/RegexpMission";
import MalwareRemovalMission from "./components/challanges/MalwareRemovalMission";
import TurretMission from "./components/challanges/TurretMission";
import GameWin from "./components/challanges/GameWin";

const Navigation = () => (
    <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
            <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
            <li><Link to="/start" className="text-white hover:text-gray-300">Start</Link></li>
            <li><Link to="/example" className="text-white hover:text-gray-300">Example</Link></li>
            <li><Link to="/vim-snake" className="text-white hover:text-gray-300">Vim Snake</Link></li>
            <li><Link to="/regexp-story" className="text-white hover:text-gray-300">Regexp Story</Link></li>
            <li><Link to="/malware-story" className="text-white hover:text-gray-300">Malware Story</Link></li>
            <li><Link to="/turret-defense" className="text-white hover:text-gray-300">Turret Defense</Link></li>
        </ul>
    </nav>
);



const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                {/*<Navigation />*/}
                <div className="container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<VimSnakeMission />} />
                        <Route path="/start" element={<VimSnakeMission />} />
                        <Route path="/regexp-mission" element={<RegexpMission />} />
                        <Route path="/malware-mission" element={<MalwareRemovalMission />} />
                        <Route path="/turret-mission" element={<TurretMission />} />
                        <Route path="/win-game" element={<GameWin />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
