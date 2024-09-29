import React, { useEffect, useRef, useState } from 'react';
import {IGamePropsBase} from "./interfaces/gameprops.interface.ts";

interface SnakeGameProps extends IGamePropsBase {
    winningScore: number; // score needed to win
    onWin: () => void;    // hook to trigger when player wins
}


const settings = {
    speed: 100,
    foodColor: "red",
    backgroundColor: "black",
    snakeColor: "green"
};

let box = 32;
let snake = [{ x: 8 * box, y: 8 * box }];
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};
let jogo: NodeJS.Timeout;

const SnakeGame: React.FC<SnakeGameProps> = ({ winningScore, onWin }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scoreRef = useRef<HTMLDivElement>(null);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d')!;
        document.addEventListener('keydown', updateDirection);
        jogo = setInterval(() => iniciarJogo(context), settings.speed);

        return () => {
            document.removeEventListener('keydown', updateDirection);
            clearInterval(jogo);
        };
    }, []);

    const updateDirection = (event: KeyboardEvent) => {
        if (event.key === 'h' && direction !== 'right') direction = 'left';
        if (event.key === 'k' && direction !== 'down') direction = 'up';
        if (event.key === 'l' && direction !== 'left') direction = 'right';
        if (event.key === 'j' && direction !== 'up') direction = 'down';
    };

    const iniciarJogo = (context: CanvasRenderingContext2D) => {
        // Check if snake hits itself
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                endGame();
                return;
            }
        }

        // Check if snake is off screen
        if (snake[0].x >= 16 * box || snake[0].x < 0 || snake[0].y >= 16 * box || snake[0].y < 0) {
            if (direction === "right") snake[0].x = 0;
            if (direction === "left") snake[0].x = 16 * box;
            if (direction === "down") snake[0].y = 0;
            if (direction === "up") snake[0].y = 16 * box;
        }

        // Draw background
        context.fillStyle = settings.backgroundColor;
        context.fillRect(0, 0, 16 * box, 16 * box);

        // Draw snake
        for (let i = 0; i < snake.length; i++) {
            context.fillStyle = settings.snakeColor;
            context.fillRect(snake[i].x, snake[i].y, box - 2, box - 2);
        }

        // Draw food
        context.fillStyle = settings.foodColor;
        context.fillRect(food.x, food.y, box, box);

        // Move snake
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        if (direction === "right") snakeX += box;
        if (direction === "left") snakeX -= box;
        if (direction === "up") snakeY -= box;
        if (direction === "down") snakeY += box;

        // Check if snake eats food
        if (snakeX !== food.x || snakeY !== food.y) {
            snake.pop(); // remove last part of snake
        } else {
            food.x = Math.floor(Math.random() * 15 + 1) * box;
            food.y = Math.floor(Math.random() * 15 + 1) * box;
        }

        // Add new head to snake
        snake.unshift({ x: snakeX, y: snakeY });

        // Check if player won
        if (snake.length >= winningScore) {
            onWin();
            clearInterval(jogo);
        }

        // Update score
        if (scoreRef.current) {
            scoreRef.current.innerText = `Score: ${snake.length}`;
        }
    };

    const endGame = () => {
        clearInterval(jogo);
        setGameOver(true);
        alert(`GAME OVER! Score: ${snake.length}`);
    };

    const restartGame = () => {
        snake = [{ x: 8 * box, y: 8 * box }];
        direction = 'right';
        setGameOver(false);
        jogo = setInterval(() => iniciarJogo(canvasRef.current!.getContext('2d')!), settings.speed);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Vim Snake Game</h2>
            <div>Controls: h (left), j (down), k (up), l (right)</div>
            <canvas
                id="snake"
                ref={canvasRef}
                style={{ border: '2px solid #00ff00', backgroundColor: '#0e0e0e' }}
                width={512}
                height={512}
            ></canvas>
            <div ref={scoreRef} style={{ color: '#00ff00', marginTop: '10px' }}>Score: 1</div>
            {gameOver && (
                <button style={restartBtnStyle} onClick={restartGame}>
                    Restart
                </button>
            )}
        </div>
    );
};

const restartBtnStyle = {
    padding: '10px 20px',
    marginTop: '20px',
    backgroundColor: '#00ff00',
    color: '#0e0e0e',
    border: 'none',
    cursor: 'pointer',
} as React.CSSProperties;

export default SnakeGame;
