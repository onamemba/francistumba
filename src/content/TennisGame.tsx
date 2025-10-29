import React, { useEffect, useRef, useState } from 'react';

const TennisGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const paddleHeight = 60;
    const paddleWidth = 10;
    let playerY = canvas.height/2 - paddleHeight/2;
    let computerY = canvas.height/2 - paddleHeight/2;
    
    let ballX = canvas.width/2;
    let ballY = canvas.height/2;
    let ballSpeedX = 4;
    let ballSpeedY = 4;
    const ballSize = 8;

    function drawRect(x: number, y: number, w: number, h: number, color: string) {
      if (!ctx) return;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }

    function drawBall(x: number, y: number, size: number, color: string) {
      if (!ctx) return;
      ctx.fillStyle = color;
      ctx.fillRect(x - size/2, y - size/2, size, size);
    }

    function draw() {
      // Clear canvas
      drawRect(0, 0, canvas.width, canvas.height, '#000');
      
      // Draw middle line
      for (let i = 0; i < canvas.height; i += 20) {
        drawRect(canvas.width/2 - 1, i, 2, 10, '#fff');
      }
      
      // Draw paddles
      drawRect(0, playerY, paddleWidth, paddleHeight, '#fff');
      drawRect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight, '#fff');
      
      // Draw ball
      drawBall(ballX, ballY, ballSize, '#fff');
      
      // Draw score
      if (!ctx) return;
      ctx.fillStyle = '#fff';
      ctx.font = '20px Arial';
      ctx.fillText(score.player.toString(), canvas.width/4, 30);
      ctx.fillText(score.computer.toString(), 3*canvas.width/4, 30);
    }

    function update() {
      // Move computer paddle
      const computerCenter = computerY + paddleHeight/2;
      if (computerCenter < ballY - 35) {
        computerY += 4;
      } else if (computerCenter > ballY + 35) {
        computerY -= 4;
      }
      
      // Move ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;
      
      // Ball collision with top and bottom
      if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
      }
      
      // Ball collision with paddles
      if (ballX < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
      }
      
      if (ballX > canvas.width - paddleWidth && ballY > computerY && ballY < computerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
      }
      
      // Score points
      if (ballX < 0) {
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
        ballX = canvas.width/2;
        ballY = canvas.height/2;
      }
      if (ballX > canvas.width) {
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
        ballX = canvas.width/2;
        ballY = canvas.height/2;
      }
    }

    function gameLoop() {
      update();
      draw();
      requestAnimationFrame(gameLoop);
    }

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      playerY = Math.max(0, Math.min(canvas.height - paddleHeight, mouseY - paddleHeight/2));
    });

    gameLoop();
  }, [score]);

  return (
    <div className="tennis-game">
      <canvas 
        ref={canvasRef} 
        width={400} 
        height={300}
        style={{ border: '2px solid #fff' }}
      />
    </div>
  );
};

export default TennisGame;