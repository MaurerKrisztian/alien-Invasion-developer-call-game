import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VimSnakeMission from "./components/challanges/VimSnakeMission.tsx";
import RegexpMission from "./components/challanges/RegexpMission.tsx";
import MalwareRemovalMission from "./components/challanges/MalwareRemovalMission.tsx";
import TurretMission from "./components/challanges/TurretMission.tsx";
import GameWin from "./components/challanges/GameWin.tsx";

const Navigation = () => (
    <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
            <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
            <li><Link to="/start" className="text-white hover:text-gray-300">Start</Link></li>
            <li><Link to="/example" className="text-white hover:text-gray-300">example</Link></li>
            <li><Link to="/vim-snake" className="text-white hover:text-gray-300">Vim Snake</Link></li>
            <li><Link to="/regexp-story" className="text-white hover:text-gray-300">Regexp Story</Link></li>
            <li><Link to="/malware-story" className="text-white hover:text-gray-300">Malware Story</Link></li>
            <li><Link to="/turret-defense" className="text-white hover:text-gray-300">Turret Defense</Link></li>
        </ul>
    </nav>
);

const Home = () => (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Alien Invasion: Developer's Call</h1>
        <Link to="/start" className="text-white hover:text-gray-300">Start Game</Link>
    </div>
);

const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
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

            {/*<Navigation />*/}
        </Router>
    );
};

export default App;