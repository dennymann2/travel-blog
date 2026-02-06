import { useEffect, useRef, useState } from 'react';

interface TetrisGameProps {
  isOpen: boolean;
  onClose: () => void;
}

type GameMode = 'menu' | 'modeSelect' | 'playing' | 'gameOver' | 'levelComplete' | 'levelSelect' | 'difficultySelect' | 'puzzleSelect';
type GameType = 'endless' | 'puzzle' | 'levels';

// Puzzle definitions - Expanded with more variety and difficulty levels
const PUZZLES = [
  {
    name: 'Starter',
    board: [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [1,1,1,1,0,0,0,0,0,0],
      [1,1,1,1,1,0,0,0,1,1],
      [1,1,1,1,1,1,0,0,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    linesToClear: 1,
    description: 'Klare eine Reihe'
  },
  {
    name: 'Double Down',
    board: [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,1,0,0,0,0,0,0,1,1],
      [1,1,1,0,0,0,0,1,1,1],
      [1,1,1,1,0,0,1,1,1,1],
      [1,1,1,1,1,0,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    linesToClear: 2,
    description: 'Klare zwei Reihen'
  },
  {
    name: 'Triple Trouble',
    board: [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [1,1,0,0,0,0,0,0,1,1],
      [1,1,0,0,0,0,0,0,1,1],
      [1,1,1,0,0,0,0,1,1,1],
      [1,1,1,0,0,0,0,1,1,1],
      [1,1,1,1,0,0,1,1,1,1],
      [1,1,1,1,1,0,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    linesToClear: 3,
    description: 'Klare drei Reihen'
  },
  {
    name: 'Tetris Master',
    board: [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,1,0,0,0,0,0,0,1,1],
      [1,1,0,0,0,0,0,0,1,1],
      [1,1,1,0,0,0,0,1,1,1],
      [1,1,1,0,0,0,0,1,1,1],
      [1,1,1,1,0,0,1,1,1,1],
      [1,1,1,1,1,0,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    linesToClear: 4,
    description: 'Klare vier Reihen (Tetris!)'
  },
  {
    name: 'The Wall',
    board: [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,1],
      [1,1,0,0,0,0,0,0,1,1],
      [1,1,0,0,0,0,0,0,1,1],
      [1,1,1,0,0,0,0,1,1,1],
      [1,1,1,0,0,0,0,1,1,1],
      [1,1,1,1,0,0,1,1,1,1],
      [1,1,1,1,1,0,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    linesToClear: 5,
    description: 'Durchbreche die Mauern'
  },
  {
    name: 'Narrow Passage',
    board: [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [1,1,0,0,0,0,0,0,1,1],
      [1,1,0,0,0,0,0,0,1,1],
      [1,1,0,0,0,0,0,0,1,1],
      [1,1,0,0,0,0,0,0,1,1],
      [1,1,0,0,0,0,0,0,1,1],
      [1,1,1,0,0,0,0,1,1,1],
      [1,1,1,0,0,0,0,1,1,1],
      [1,1,1,1,0,0,1,1,1,1],
      [1,1,1,1,1,0,1,1,1,1],
      [1,1,1,1,1,0,1,1,1,1],
      [1,1,1,1,1,0,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    linesToClear: 6,
    description: 'Navigiere durch enge Spalten'
  },
  {
    name: 'Peak Master',
    board: [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,1,1,1,1,1,1,0,0],
      [0,0,1,1,1,1,1,1,0,0],
      [0,1,1,1,1,1,1,1,1,0],
      [0,1,1,1,1,1,1,1,1,0],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    linesToClear: 7,
    description: 'Erklimme den Berg'
  },
];

// Level configurations with board flipping for advanced levels
const LEVEL_CONFIGS = [
  { speed: 'slow', delay: 600, name: 'Easy', boardFlip: false },
  { speed: 'normal', delay: 400, name: 'Normal', boardFlip: false },
  { speed: 'fast', delay: 250, name: 'Hard', boardFlip: true },
  { speed: 'insane', delay: 150, name: 'Insane', boardFlip: true },
];

// Difficulty options for endless mode
const DIFFICULTY_OPTIONS = [
  { id: 'easy', label: 'Easy', speed: 600, acceleration: 15 },
  { id: 'medium', label: 'Medium', speed: 400, acceleration: 25 },
  { id: 'hard', label: 'Hard', speed: 250, acceleration: 35 },
  { id: 'insane', label: 'Insane', speed: 150, acceleration: 50 },
  { id: 'nightmare', label: 'Nightmare', speed: 80, acceleration: 80 },
];

export function TetrisGame({ isOpen, onClose }: TetrisGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [gameType, setGameType] = useState<GameType>('endless');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'insane' | 'nightmare'>('medium');
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const gameStateRef = useRef<any>({});
  const [holdUsed, setHoldUsed] = useState(false);

  useEffect(() => {
    if (!isOpen || !canvasRef.current || gameMode === 'menu' || gameMode === 'modeSelect' || gameMode === 'levelSelect' || gameMode === 'difficultySelect' || gameMode === 'puzzleSelect') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COLS = 10;
    const ROWS = 20;
    const BLOCK_SIZE = 25;
    const PREVIEW_SIZE = 4;

    const TETRIS_PIECES = [
      { shape: [[1, 1, 1, 1]], color: '#FF6B6B', name: 'I' },
      { shape: [[1, 1], [1, 1]], color: '#4ECDC4', name: 'O' },
      { shape: [[0, 1, 1], [1, 1, 0]], color: '#45B7D1', name: 'S' },
      { shape: [[1, 1, 0], [0, 1, 1]], color: '#FFA07A', name: 'Z' },
      { shape: [[1, 0, 0], [1, 1, 1]], color: '#98D8C8', name: 'J' },
      { shape: [[0, 0, 1], [1, 1, 1]], color: '#F7DC6F', name: 'L' },
      { shape: [[0, 1, 0], [1, 1, 1]], color: '#BB8FCE', name: 'T' },
    ];

    // Get base speed from game type and difficulty
    let baseSpeed = 400;
    let speedAcceleration = 25;
    
    if (gameType === 'endless') {
      const diffConfig = DIFFICULTY_OPTIONS.find(d => d.id === difficulty);
      if (diffConfig) {
        baseSpeed = diffConfig.speed;
        speedAcceleration = diffConfig.acceleration;
      }
    } else if (gameType === 'levels') {
      const levelConfig = LEVEL_CONFIGS[currentLevel - 1];
      if (levelConfig) {
        baseSpeed = levelConfig.delay;
        speedAcceleration = 30;
      }
    }

    let gameState = {
      board: Array(ROWS).fill(null).map(() => Array(COLS).fill(0)),
      currentPiece: null as any,
      nextPiece: null as any,
      storedPiece: null as any,
      hasSwapped: false,
      score: 0,
      lines: 0,
      level: 1,
      gameOver: false,
      lastDropTime: Date.now(),
      dropDelay: baseSpeed,
      baseSpeed: baseSpeed,
      speedAcceleration: speedAcceleration,
      isHardDropping: false,
    };

    // Initialize puzzle board if in puzzle mode
    if (gameType === 'puzzle' && PUZZLES[currentPuzzle]) {
      gameState.board = JSON.parse(JSON.stringify(PUZZLES[currentPuzzle].board));
    }

    gameStateRef.current = gameState;

    function getRandomPiece() {
      const piece = TETRIS_PIECES[Math.floor(Math.random() * TETRIS_PIECES.length)];
      return {
        ...piece,
        x: Math.floor(COLS / 2) - 1,
        y: 0,
      };
    }

    function drawBlock(x: number, y: number, color: string, size: number = BLOCK_SIZE) {
      ctx!.fillStyle = color;
      ctx!.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
      ctx!.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx!.lineWidth = 1;
      ctx!.strokeRect(x * size + 1, y * size + 1, size - 2, size - 2);
    }

    function drawBoard() {
      ctx!.fillStyle = '#0f172a';
      ctx!.fillRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);

      // Draw grid
      ctx!.strokeStyle = 'rgba(100,116,139,0.2)';
      ctx!.lineWidth = 0.5;
      for (let i = 0; i <= COLS; i++) {
        ctx!.beginPath();
        ctx!.moveTo(i * BLOCK_SIZE, 0);
        ctx!.lineTo(i * BLOCK_SIZE, ROWS * BLOCK_SIZE);
        ctx!.stroke();
      }
      for (let i = 0; i <= ROWS; i++) {
        ctx!.beginPath();
        ctx!.moveTo(0, i * BLOCK_SIZE);
        ctx!.lineTo(COLS * BLOCK_SIZE, i * BLOCK_SIZE);
        ctx!.stroke();
      }

      // Draw placed blocks
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (gameState.board[r][c]) {
            drawBlock(c, r, gameState.board[r][c]);
          }
        }
      }
    }

    function drawPiece(piece: any, alpha: number = 1) {
      ctx!.globalAlpha = alpha;
      piece.shape.forEach((row: number[], r: number) => {
        row.forEach((cell: number, c: number) => {
          if (cell) {
            drawBlock(piece.x + c, piece.y + r, piece.color);
          }
        });
      });
      ctx!.globalAlpha = 1;
    }

    function drawGhost(piece: any) {
      let ghostY = piece.y;
      while (!isColliding(piece, piece.x, ghostY + 1)) {
        ghostY++;
      }
      const ghostPiece = { ...piece, y: ghostY };
      ctx!.globalAlpha = 0.3;
      piece.shape.forEach((row: number[], r: number) => {
        row.forEach((cell: number, c: number) => {
          if (cell) {
            ctx!.strokeStyle = piece.color;
            ctx!.lineWidth = 2;
            ctx!.strokeRect(
              (ghostPiece.x + c) * BLOCK_SIZE + 1,
              (ghostPiece.y + r) * BLOCK_SIZE + 1,
              BLOCK_SIZE - 2,
              BLOCK_SIZE - 2
            );
          }
        });
      });
      ctx!.globalAlpha = 1;
    }

    function drawPreview(piece: any, x: number, y: number, title: string) {
      if (!piece) return;
      ctx!.fillStyle = 'rgba(100,116,139,0.2)';
      ctx!.fillRect(x, y, PREVIEW_SIZE * BLOCK_SIZE, PREVIEW_SIZE * BLOCK_SIZE);
      ctx!.strokeStyle = '#64748b';
      ctx!.lineWidth = 2;
      ctx!.strokeRect(x, y, PREVIEW_SIZE * BLOCK_SIZE, PREVIEW_SIZE * BLOCK_SIZE);

      ctx!.fillStyle = '#cbd5e1';
      ctx!.font = 'bold 12px Arial';
      ctx!.fillText(title, x + 5, y + 15);

      piece.shape.forEach((row: number[], r: number) => {
        row.forEach((cell: number, c: number) => {
          if (cell) {
            ctx!.fillStyle = piece.color;
            ctx!.fillRect(x + 5 + c * 18, y + 25 + r * 18, 16, 16);
          }
        });
      });
    }

    function isColliding(piece: any, x: number, y: number): boolean {
      for (let r = 0; r < piece.shape.length; r++) {
        for (let c = 0; c < piece.shape[r].length; c++) {
          if (piece.shape[r][c]) {
            const newX = x + c;
            const newY = y + r;

            if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
            if (newY >= 0 && gameState.board[newY]?.[newX]) return true;
          }
        }
      }
      return false;
    }

    function placePiece(piece: any) {
      piece.shape.forEach((row: number[], r: number) => {
        row.forEach((cell: number, c: number) => {
          if (cell && piece.y + r >= 0) {
            gameState.board[piece.y + r][piece.x + c] = piece.color;
          }
        });
      });
    }

    function clearLines() {
      let linesCleared = 0;
      for (let r = ROWS - 1; r >= 0; r--) {
        if (gameState.board[r].every(cell => cell !== 0)) {
          gameState.board.splice(r, 1);
          gameState.board.unshift(Array(COLS).fill(0));
          linesCleared++;
          r++;
        }
      }
      return linesCleared;
    }

    function rotatePiece(piece: any) {
      const rotated = piece.shape[0].map((_, i) =>
        piece.shape.map(row => row[i]).reverse()
      );
      return { ...piece, shape: rotated };
    }

    function swapPiece() {
      if (gameState.hasSwapped) return false;
      if (!gameState.storedPiece) {
        gameState.storedPiece = gameState.currentPiece;
        gameState.currentPiece = gameState.nextPiece;
        gameState.nextPiece = getRandomPiece();
      } else {
        [gameState.currentPiece, gameState.storedPiece] = [gameState.storedPiece, gameState.currentPiece];
        gameState.currentPiece.x = Math.floor(COLS / 2) - 1;
        gameState.currentPiece.y = 0;
      }
      gameState.hasSwapped = true;
      setHoldUsed(true);
      return true;
    }

    function update() {
      if (!gameState.currentPiece) {
        gameState.currentPiece = getRandomPiece();
        gameState.nextPiece = getRandomPiece();
        gameState.hasSwapped = false;
        setHoldUsed(false);
      }

      const now = Date.now();
      if (now - gameState.lastDropTime > gameState.dropDelay || gameState.isHardDropping) {
        const nextY = gameState.currentPiece.y + 1;

        if (isColliding(gameState.currentPiece, gameState.currentPiece.x, nextY)) {
          placePiece(gameState.currentPiece);
          const linesCleared = clearLines();
          
          if (linesCleared > 0) {
            gameState.lines += linesCleared;
            gameState.score += linesCleared * (100 * linesCleared);
            
            // Check puzzle completion
            if (gameType === 'puzzle' && PUZZLES[currentPuzzle]) {
              if (gameState.lines >= PUZZLES[currentPuzzle].linesToClear) {
                setGameMode('levelComplete');
                return;
              }
            }

            // Update level and speed for endless/levels
            if (gameType === 'endless' || gameType === 'levels') {
              const newLevel = Math.floor(gameState.lines / 10) + 1;
              gameState.level = newLevel;
              gameState.dropDelay = Math.max(50, gameState.baseSpeed - (newLevel - 1) * gameState.speedAcceleration);
              setLevel(newLevel);
            }
            
            setLines(gameState.lines);
          }

          gameState.currentPiece = gameState.nextPiece;
          gameState.nextPiece = getRandomPiece();
          gameState.hasSwapped = false;
          setHoldUsed(false);

          // Check if new piece collides immediately (game over)
          if (isColliding(gameState.currentPiece, gameState.currentPiece.x, gameState.currentPiece.y)) {
            gameState.gameOver = true;
            setGameMode('gameOver');
          }
        } else {
          gameState.currentPiece.y = nextY;
        }
        gameState.lastDropTime = now;
        setScore(gameState.score);
      }
    }

    function draw() {
      drawBoard();
      if (gameState.currentPiece) {
        drawGhost(gameState.currentPiece);
        drawPiece(gameState.currentPiece);
      }

      // Draw next piece
      drawPreview(gameState.nextPiece, COLS * BLOCK_SIZE + 20, 20, 'Nächstes');

      // Draw stored piece
      drawPreview(gameState.storedPiece, COLS * BLOCK_SIZE + 20, 140, 'Gespeichert');
    }

    function gameLoop() {
      if (!gameState.gameOver) {
        update();
        draw();
      }
    }

    const gameInterval = setInterval(gameLoop, 30);

    function handleKeyPress(e: KeyboardEvent) {
      if (gameState.gameOver) return;

      switch (e.key.toLowerCase()) {
        case 'arrowleft':
          if (!isColliding(gameState.currentPiece, gameState.currentPiece.x - 1, gameState.currentPiece.y)) {
            gameState.currentPiece.x -= 1;
          }
          e.preventDefault();
          break;
        case 'arrowright':
          if (!isColliding(gameState.currentPiece, gameState.currentPiece.x + 1, gameState.currentPiece.y)) {
            gameState.currentPiece.x += 1;
          }
          e.preventDefault();
          break;
        case 'arrowdown':
          if (!isColliding(gameState.currentPiece, gameState.currentPiece.x, gameState.currentPiece.y + 1)) {
            gameState.currentPiece.y += 1;
            gameState.score += 1;
            setScore(gameState.score);
          }
          e.preventDefault();
          break;
        case ' ':
          const rotated = rotatePiece(gameState.currentPiece);
          if (!isColliding(rotated, rotated.x, rotated.y)) {
            gameState.currentPiece = rotated;
          }
          e.preventDefault();
          break;
        case 'z':
        case 'c':
          swapPiece();
          e.preventDefault();
          break;
        case 'shift':
          // Hard drop
          while (!isColliding(gameState.currentPiece, gameState.currentPiece.x, gameState.currentPiece.y + 1)) {
            gameState.currentPiece.y += 1;
            gameState.score += 2;
          }
          gameState.lastDropTime = Date.now() - gameState.dropDelay;
          setScore(gameState.score);
          e.preventDefault();
          break;
      }
      draw();
    }

    window.addEventListener('keydown', handleKeyPress);
    draw();

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen, gameMode, gameType, difficulty, currentPuzzle, currentLevel]);

  if (!isOpen) return null;

  const handleStartGame = (type: GameType) => {
    setGameType(type);
    if (type === 'puzzle') {
      setGameMode('puzzleSelect');
    } else if (type === 'levels') {
      setGameMode('levelSelect');
    } else {
      setGameMode('difficultySelect');
    }
    setScore(0);
    setLevel(1);
    setLines(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-slate-800 hover:bg-red-600/30 text-slate-300 hover:text-red-400 transition-all duration-300 border border-slate-700 hover:border-red-500/50"
          title="Spiel schließen"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Menu Screen */}
        {gameMode === 'menu' && (
          <div className="p-8 space-y-8 min-h-96 flex flex-col justify-center items-center">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                🎮 TETRIS
              </h1>
              <p className="text-slate-400 text-lg">Ultimate Edition</p>
            </div>
            <button
              onClick={() => setGameMode('modeSelect')}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/50 transform hover:scale-105 active:scale-95 text-lg"
            >
              Spiel starten
            </button>
          </div>
        )}

        {/* Mode Select Screen */}
        {gameMode === 'modeSelect' && (
          <div className="p-8 space-y-6 min-h-96 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Wähle einen Modus</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Endless Mode */}
              <button
                onClick={() => handleStartGame('endless')}
                className="p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-xl hover:border-blue-400 hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <div className="text-3xl mb-2">♾️</div>
                <h3 className="text-xl font-bold text-white mb-2">Endless</h3>
                <p className="text-sm text-slate-300">Spielen Sie so lange wie möglich!</p>
              </button>

              {/* Levels Mode */}
              <button
                onClick={() => handleStartGame('levels')}
                className="p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-xl hover:border-green-400 hover:from-green-500/30 hover:to-green-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <div className="text-3xl mb-2">📈</div>
                <h3 className="text-xl font-bold text-white mb-2">Level</h3>
                <p className="text-sm text-slate-300">Komplexere Herausforderungen!</p>
              </button>

              {/* Puzzle Mode */}
              <button
                onClick={() => handleStartGame('puzzle')}
                className="p-6 bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-xl hover:border-purple-400 hover:from-purple-500/30 hover:to-purple-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <div className="text-3xl mb-2">🧩</div>
                <h3 className="text-xl font-bold text-white mb-2">Puzzle</h3>
                <p className="text-sm text-slate-300">Lösen Sie spezielle Rätsel!</p>
              </button>
            </div>
            <button
              onClick={() => setGameMode('menu')}
              className="px-6 py-2 text-slate-300 hover:text-white transition-colors mt-4"
            >
              ← Zurück
            </button>
          </div>
        )}

        {/* Difficulty Select Screen */}
        {gameMode === 'difficultySelect' && (
          <div className="p-8 space-y-6 min-h-96 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Wähle Schwierigkeit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIFFICULTY_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setDifficulty(opt.id as any);
                    setGameMode('playing');
                  }}
                  className="p-4 bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 border border-indigo-500/50 rounded-xl hover:border-indigo-400 hover:from-indigo-500/30 hover:to-indigo-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <h3 className="text-lg font-bold text-white mb-1">{opt.label}</h3>
                  <p className="text-sm text-slate-300">Basis: {opt.speed}ms</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setGameMode('modeSelect')}
              className="px-6 py-2 text-slate-300 hover:text-white transition-colors mt-4"
            >
              ← Zurück
            </button>
          </div>
        )}

        {/* Level Select Screen */}
        {gameMode === 'levelSelect' && (
          <div className="p-8 space-y-6 min-h-96 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Wähle Level</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
              {LEVEL_CONFIGS.map((config, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentLevel(idx + 1);
                    setGameMode('playing');
                  }}
                  className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-xl hover:border-green-400 hover:from-green-500/30 hover:to-green-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <h3 className="text-lg font-bold text-white mb-1">Level {idx + 1}: {config.name}</h3>
                  <p className="text-sm text-slate-300">{config.speed}ms Base {config.boardFlip ? '🔄' : ''}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setGameMode('modeSelect')}
              className="px-6 py-2 text-slate-300 hover:text-white transition-colors mt-4"
            >
              ← Zurück
            </button>
          </div>
        )}

        {/* Puzzle Select Screen */}
        {gameMode === 'puzzleSelect' && (
          <div className="p-8 space-y-6 min-h-96 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Wähle Puzzle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
              {PUZZLES.map((puzzle, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentPuzzle(idx);
                    setGameMode('playing');
                  }}
                  className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-xl hover:border-purple-400 hover:from-purple-500/30 hover:to-purple-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <h3 className="text-lg font-bold text-white mb-1">{puzzle.name}</h3>
                  <p className="text-sm text-slate-300">{puzzle.description}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setGameMode('modeSelect')}
              className="px-6 py-2 text-slate-300 hover:text-white transition-colors mt-4"
            >
              ← Zurück
            </button>
          </div>
        )}

        {/* Playing Screen */}
        {gameMode === 'playing' && (
          <>
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-slate-700">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setGameMode('menu')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  ← Menü
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-white">🎮 Tetris - {
                    gameType === 'endless' ? 'Endless' :
                    gameType === 'levels' ? `Level ${currentLevel}` :
                    PUZZLES[currentPuzzle]?.name
                  }</h2>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-amber-400 text-lg font-bold">Score: {score}</div>
                  <div className="text-slate-300 text-sm">Level: {level} | Lines: {lines}</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3">
                ← → Bewegen | ↓ Schneller fallen | Leertaste Drehen | Z/C Speichern {holdUsed ? '(benutzt)' : ''} | Shift Hard Drop
              </p>
            </div>

            <div className="p-4 bg-gradient-to-b from-slate-900 to-slate-950 relative min-h-96">
              <div className="flex gap-4 justify-center">
                <div>
                  <canvas
                    ref={canvasRef}
                    width={250}
                    height={500}
                    className="border-2 border-amber-500 rounded-lg bg-slate-900 shadow-lg"
                  />
                </div>
              </div>

              {/* Game Over Overlay */}
              {gameStateRef.current.gameOver && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-b-2xl backdrop-blur-sm">
                  <div className="text-center space-y-6">
                    <h3 className="text-5xl font-bold text-white">Game Over! 💥</h3>
                    <div className="space-y-3">
                      <p className="text-3xl text-amber-400 font-bold">Score: {score}</p>
                      <p className="text-2xl text-slate-300">Level: {level}</p>
                      <p className="text-xl text-slate-400">Lines: {lines}</p>
                    </div>
                    <div className="flex gap-4 justify-center pt-4">
                      <button
                        onClick={() => {
                          setGameMode('modeSelect');
                          setScore(0);
                          setLevel(1);
                          setLines(0);
                        }}
                        className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
                      >
                        Neues Spiel
                      </button>
                      <button
                        onClick={() => setGameMode('menu')}
                        className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
                      >
                        Zum Menü
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Level Complete Screen */}
        {gameMode === 'levelComplete' && (
          <div className="p-8 space-y-8 min-h-96 flex flex-col justify-center items-center">
            <div className="text-center space-y-6">
              <h1 className="text-5xl font-bold text-white">🎉 Puzzle gelöst!</h1>
              <div className="space-y-3">
                <p className="text-3xl text-amber-400 font-bold">Score: {score}</p>
                <p className="text-2xl text-slate-300">Reihen: {lines}</p>
              </div>
              <div className="flex flex-col gap-4 pt-4">
                <button
                  onClick={() => {
                    const nextPuzzle = currentPuzzle + 1;
                    if (nextPuzzle < PUZZLES.length) {
                      setCurrentPuzzle(nextPuzzle);
                      setGameMode('playing');
                      setScore(0);
                      setLevel(1);
                      setLines(0);
                    } else {
                      setGameMode('puzzleSelect');
                    }
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  {currentPuzzle + 1 < PUZZLES.length ? 'Nächstes Puzzle' : 'Alle Puzzles gelöst!'}
                </button>
                <button
                  onClick={() => setGameMode('puzzleSelect')}
                  className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  Puzzle wählen
                </button>
                <button
                  onClick={() => setGameMode('menu')}
                  className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  Zum Menü
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameMode === 'gameOver' && (
          <div className="p-8 space-y-8 min-h-96 flex flex-col justify-center items-center">
            <div className="text-center space-y-6">
              <h1 className="text-5xl font-bold text-white">Game Over! 💥</h1>
              <div className="space-y-3">
                <p className="text-3xl text-amber-400 font-bold">Score: {score}</p>
                <p className="text-2xl text-slate-300">Level: {level}</p>
                <p className="text-xl text-slate-400">Lines: {lines}</p>
              </div>
              <div className="flex flex-col gap-4 pt-4">
                <button
                  onClick={() => {
                    setGameMode('modeSelect');
                    setScore(0);
                    setLevel(1);
                    setLines(0);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  Neues Spiel
                </button>
                <button
                  onClick={() => setGameMode('menu')}
                  className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  Zum Menü
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
