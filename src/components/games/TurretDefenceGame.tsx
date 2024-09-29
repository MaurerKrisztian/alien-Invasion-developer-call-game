import React, { useEffect, useRef, useState, useCallback } from 'react';
import { IGamePropsBase } from "./interfaces/gameprops.interface.ts";

interface AlienProps {
    x: number;
    y: number;
    speed: number;
    radius: number;
}

interface BulletProps {
    x: number;
    y: number;
    angle: number;
    speed: number;
}

interface TurretDefenseGameProps extends IGamePropsBase {
    onWin: () => void;
    maxAliens?: number;
    maxPassed?: number;
    bulletSpeed?: number;
}

const TurretDefenseGame: React.FC<TurretDefenseGameProps> = ({
                                                                 onWin,
                                                                 maxAliens = 50,
                                                                 maxPassed = 5,
                                                                 bulletSpeed = 7
                                                             }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [aliensPassed, setAliensPassed] = useState(0);
    const [aliensDestroyed, setAliensDestroyed] = useState(0);
    const [bullets, setBullets] = useState<BulletProps[]>([]);
    const [alien, setAlien] = useState<AlienProps | null>(null);
    const [turret, setTurret] = useState({ x: 400, y: 370, angle: 0 });
    const [isGameOver, setIsGameOver] = useState(false);
    const [customAimScript, setCustomAimScript] = useState('');
    const [scriptError, setScriptError] = useState('');
    const lastShotTimeRef = useRef(0);
    const [isSimulation, setIsSimulation] = useState(true);
    const [showHint, setShowHint] = useState(false);
    const [hintLevel, setHintLevel] = useState(0);
    const [showSolution, setShowSolution] = useState(false);
    const [isManualControl, setIsManualControl] = useState(false);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        setMouseX(event.clientX - rect.left);
        setMouseY(event.clientY - rect.top);
    }, []);

    const defaultAimTurret = useCallback((
        alienX: number,
        alienY: number,
        alienSpeed: number,
        turretX: number,
        turretY: number,
        bulletSpeed: number,
        mouseX: number,
        mouseY: number
    ) => {
        if (isManualControl) {
            return Math.atan2(mouseY - turretY, mouseX - turretX);
        }

        const distanceX = alienX - turretX;
        const distanceY = alienY - turretY;
        const distance = Math.hypot(distanceX, distanceY);
        const timeToTarget = distance / bulletSpeed;
        const futureAlienY = alienY + alienSpeed * timeToTarget;
        return Math.atan2(futureAlienY - turretY, alienX - turretX);
    }, [isManualControl]);

    const updateScoreBoard = useCallback(() => {
        if (isSimulation) return;
        const aliensLeft = maxAliens - aliensDestroyed;
        document.getElementById('aliensDestroyed')!.textContent = `Aliens Destroyed: ${aliensDestroyed}`;
        document.getElementById('aliensLeft')!.textContent = `Aliens Left: ${aliensLeft}`;
        document.getElementById('aliensPassed')!.textContent = `Aliens Passed: ${aliensPassed} / ${maxPassed}`;
    }, [aliensDestroyed, aliensPassed, isSimulation, maxAliens, maxPassed]);

    const spawnAlien = useCallback(() => {
        setAlien({
            x: Math.random() * ((canvasRef.current?.width || 800) - 40),
            y: 0,
            speed: Math.random() * 2 + 1,
            radius: 35,
        });
    }, []);

    const gameOver = useCallback((result: 'win' | 'lose') => {
        setIsGameOver(true);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = result === 'win' ? '#00ff00' : '#ff4141';
            ctx.font = '30px Arial';
            ctx.fillText(
                result === 'win' ? 'You Win!' : 'Game Over!',
                canvas.width / 2 - 80,
                canvas.height / 2
            );
        }
        if (result === 'win') {
            setTimeout(() => {
                onWin();
            }, 2000)
        }
    }, [onWin]);

    const shootBullet = useCallback(() => {
        if (!alien) return;
        const bullet: BulletProps = {
            x: turret.x,
            y: turret.y,
            angle: turret.angle,
            speed: bulletSpeed,
        };
        setBullets(prevBullets => [...prevBullets, bullet]);
    }, [alien, turret, bulletSpeed]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (!ctx) return;

        let animationFrameId: number;

        const drawTurret = () => {
            const size = 20;
            ctx.fillStyle = '#00ff00';
            ctx.beginPath();
            ctx.moveTo(turret.x, turret.y);
            ctx.lineTo(turret.x - size, turret.y + size);
            ctx.lineTo(turret.x + size, turret.y + size);
            ctx.closePath();
            ctx.fill();
        };

        const drawAimingLine = () => {
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(turret.x, turret.y);
            const lineLength = 100;
            const endX = turret.x + Math.cos(turret.angle) * lineLength;
            const endY = turret.y + Math.sin(turret.angle) * lineLength;
            ctx.lineTo(endX, endY);
            ctx.stroke();
        };

        const drawBullets = () => {
            ctx.fillStyle = '#ffff00';
            bullets.forEach(bullet => {
                ctx.beginPath();
                ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const updateGame = (currentTime: number) => {
            if (isGameOver || !ctx || !alien || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawTurret();
            drawAimingLine();
            drawBullets();

            ctx.fillStyle = '#ff4141';
            ctx.beginPath();
            ctx.arc(alien.x, alien.y, alien.radius, 0, Math.PI * 2);
            ctx.fill();

            const newY = alien.y + alien.speed;
            if (newY > canvas.height) {
                if (!isSimulation) {
                    setAliensPassed((prev) => {
                        const newPassed = prev + 1;
                        if (newPassed >= maxPassed) {
                            gameOver('lose');
                        } else {
                            spawnAlien();
                        }
                        return newPassed;
                    });
                } else {
                    spawnAlien();
                }
            } else {
                setAlien((prev) => prev && {...prev, y: newY});
            }

            let aimFunction;
            if (isManualControl) {
                aimFunction = defaultAimTurret;
            } else {
                try {
                    aimFunction = new Function('alienX', 'alienY', 'alienSpeed', 'turretX', 'turretY', 'bulletSpeed', 'mouseX', 'mouseY', customAimScript || defaultAimingScript);
                } catch (error) {
                    console.error('Error in custom aiming script:', error);
                    aimFunction = defaultAimTurret;
                }
            }

            if (alien) {
                try {
                    const angle = aimFunction(alien.x, alien.y, alien.speed, turret.x, turret.y, bulletSpeed, mouseX, mouseY);
                    setTurret((prev) => ({...prev, angle}));
                    setScriptError('');
                } catch (error) {
                    console.error('Error executing custom aiming script:', error);
                    setScriptError('Error in aiming script. Check the console for details.');
                }
            }

            // Random shooting
            if (currentTime - lastShotTimeRef.current > 1000 + Math.random() * 2000) {
                shootBullet();
                lastShotTimeRef.current = currentTime;
            }

            // Update bullet positions
            setBullets(prevBullets =>
                prevBullets.map(bullet => ({
                    ...bullet,
                    x: bullet.x + Math.cos(bullet.angle) * bullet.speed,
                    y: bullet.y + Math.sin(bullet.angle) * bullet.speed
                })).filter(bullet =>
                    bullet.x >= 0 && bullet.x <= canvas.width &&
                    bullet.y >= 0 && bullet.y <= canvas.height
                )
            );

            // Check for collisions
            bullets.forEach(bullet => {
                if (alien && Math.hypot(bullet.x - alien.x, bullet.y - alien.y) < alien.radius) {
                    if (!isSimulation) {
                        setAliensDestroyed(prev => {
                            const newDestroyed = prev + 1;
                            if (newDestroyed >= maxAliens) {
                                gameOver('win');
                            } else {
                                spawnAlien();
                            }
                            return newDestroyed;
                        });
                    } else {
                        spawnAlien();
                    }
                    setBullets(prevBullets => prevBullets.filter(b => b !== bullet));
                }
            });

            updateScoreBoard();

            animationFrameId = requestAnimationFrame(updateGame);
        };

        animationFrameId = requestAnimationFrame(updateGame);

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [alien, turret, isGameOver, customAimScript, mouseX, mouseY, handleMouseMove, gameOver, spawnAlien, updateScoreBoard, bullets, shootBullet, defaultAimTurret, isSimulation, maxAliens, maxPassed]);

    useEffect(() => {
        if (!alien && !isGameOver) {
            spawnAlien();
        }
    }, [alien, isGameOver, spawnAlien]);

    const startGame = () => {
        setIsGameOver(false);
        setAliensPassed(0);
        setAliensDestroyed(0);
        setBullets([]);
        updateScoreBoard();
        spawnAlien();
        setIsSimulation(false);
    };

    const startSimulation = () => {
        setIsGameOver(false);
        setAliensPassed(0);
        setAliensDestroyed(0);
        setBullets([]);
        spawnAlien();
        setIsSimulation(true);
    };

    const handleScriptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCustomAimScript(event.target.value);
    };

    const defaultAimingScript = `
// Custom aiming function
// Parameters:
// alienX, alienY: current alien position
// alienSpeed: current alien speed
// turretX, turretY: turret position
// bulletSpeed: speed of the bullets
// mouseX, mouseY: current mouse position
// Return value should be the angle in radians

const distanceX = alienX - turretX;
const distanceY = alienY - turretY;
const distance = Math.hypot(distanceX, distanceY);
const timeToTarget = distance / bulletSpeed;




const angle = 5; // replace this with your calculations
return angle;
`.trim();

    const hints = [
        "Try to predict where the alien will be when the bullet reaches it.",
        "Use the alien's speed to calculate its future position.",
        "The `Math.atan2()` function can help you calculate the angle between two points.",
        "Remember to account for the bullet's travel time when predicting the alien's position.",
    ];

    const toggleHint = () => {
        if (showHint) {
            setHintLevel((prev) => (prev + 1) % hints.length);
        } else {
            setShowHint(true);
        }
    };

    const toggleSolution = () => {
        setShowSolution(!showSolution);
    };

    const toggleManualControl = () => {
        setIsManualControl(!isManualControl);
    };

    return (
        <div style={{color: '#00ff00', backgroundColor: '#0e0e0e', textAlign: 'center', height: '100vh'}}>
            <h1>Turret Defense Game: Aiming Script Tutorial</h1>
            <p>Below is a radar simulation of an alien attack. To aim your turret at the incoming alien ships, you'll need to calculate the angle between the turret and the alien's position. Once you're ready, hit Deploy to start!</p>

            <canvas
                ref={canvasRef}
                width="800"
                height="400"
                style={{border: '2px solid #00ff00', display: 'block', margin: '20px auto', backgroundColor: '#141414'}}
            />
            <div id="scoreBoard" style={{margin: '20px'}}>
                <p id="aliensDestroyed">Aliens Destroyed: {aliensDestroyed}</p>
                <p id="aliensLeft">Aliens Left: {maxAliens - aliensDestroyed}</p>
                <p id="aliensPassed">Aliens Passed: {aliensPassed} / {maxPassed}</p>
            </div>
            <div style={{color: '#ff4141', height: '20px'}}>{scriptError}</div>
            <textarea
                id="codeInput"
                value={customAimScript || defaultAimingScript}
                onChange={handleScriptChange}
                style={{
                    width: '86%',
                    height: '255px',
                    fontSize: '16px',
                    padding: '10px',
                    color: '#00ff00',
                    backgroundColor: '#0e0e0e',
                    border: '2px solid #00ff00',
                }}
            />
            <div>
                <button onClick={startSimulation} style={buttonStyle}>Simulate</button>
                <button onClick={startGame} style={buttonStyle}>Deploy</button>
                <button onClick={toggleHint} style={buttonStyle}></button>
                    <button onClick={toggleHint} style={buttonStyle}>
                        {showHint ? 'Next Hint' : 'Show Hint'}
                    </button>
                    <button onClick={toggleSolution} style={buttonStyle}>
                        {showSolution ? 'Hide Solution' : 'Show Solution'}
                    </button>
                    <button onClick={toggleManualControl} style={buttonStyle}>
                        {isManualControl ? 'Auto Aim' : 'Manual Control'}
                    </button>
            </div>
            {showHint && (
                <div style={{margin: '20px', padding: '10px', border: '1px solid #00ff00'}}>
                    <h3>Hint {hintLevel + 1}</h3>
                    <p>{hints[hintLevel]}</p>
                </div>
            )}
            {showSolution && (
                <div style={{margin: '20px', padding: '10px', border: '1px solid #00ff00'}}>
                    <h3>Example Solution</h3>
                    <pre style={{textAlign: 'left', whiteSpace: 'pre-wrap'}}>
                        {`
const distanceX = alienX - turretX;
const distanceY = alienY - turretY;
const distance = Math.hypot(distanceX, distanceY);
const timeToTarget = distance / bulletSpeed;

// Predict future position of alien
const futureAlienY = alienY + alienSpeed * timeToTarget;

// Calculate angle to aim at the predicted position
const angle = Math.atan2(futureAlienY - turretY, alienX - turretX);

return angle;
                        `}
                    </pre>
                </div>
            )}
        </div>
);
};

const buttonStyle = {
    padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#00ff00',
        color: '#0e0e0e',
        border: 'none',
        cursor: 'pointer',
        margin: '10px',
};

export default TurretDefenseGame;