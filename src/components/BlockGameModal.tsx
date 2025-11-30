import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

type Cell = {
  color: string;
};

type Board = (Cell | null)[][];

type Position = { x: number; y: number };

type TetrominoShape = number[][];

interface Tetromino {
  shape: TetrominoShape;
  color: string;
}

type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

const BRAND_COLORS = [
  "#38bdf8",
  "#a855f7",
  "#22d3ee",
  "#818cf8",
  "#f472b6",
  "#c084fc",
  "#0ea5e9",
];

const TETROMINOES: Record<TetrominoType, Tetromino> = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: BRAND_COLORS[0],
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: BRAND_COLORS[1],
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: BRAND_COLORS[2],
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: BRAND_COLORS[3],
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: BRAND_COLORS[4],
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: BRAND_COLORS[5],
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: BRAND_COLORS[6],
  },
};

const createEmptyBoard = (): Board =>
  Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null),
  );

interface Piece {
  shape: TetrominoShape;
  color: string;
  position: Position;
  type: TetrominoType;
}

export const BlockGame = () => {
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const tetrominoKeys = useMemo(() => Object.keys(TETROMINOES) as TetrominoType[], []);

  const createNewPiece = useCallback((): Piece => {
    const randomType = tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];
    const tetromino = TETROMINOES[randomType];
    return {
      shape: tetromino.shape,
      color: tetromino.color,
      position: {
        x: Math.floor(BOARD_WIDTH / 2) - Math.floor(tetromino.shape[0].length / 2),
        y: 0,
      },
      type: randomType,
    };
  }, [tetrominoKeys]);

  const canPlacePiece = useCallback(
    (piece: Piece, newPosition: Position): boolean => {
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (!piece.shape[y][x]) continue;

          const newX = newPosition.x + x;
          const newY = newPosition.y + y;

          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return false;
          }

          if (newY >= 0 && board[newY][newX] !== null) {
            return false;
          }
        }
      }
      return true;
    },
    [board],
  );

  const rotatePiece = useCallback((piece: Piece): Piece => {
    const rotatedShape = piece.shape[0].map((_, index) =>
      piece.shape.map((row) => row[index]).reverse(),
    );
    return { ...piece, shape: rotatedShape };
  }, []);

  const placePieceOnBoard = useCallback(
    (piece: Piece): Board => {
      const newBoard = board.map((row) => [...row]);

      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (!piece.shape[y][x]) continue;
          const boardY = piece.position.y + y;
          const boardX = piece.position.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = { color: piece.color };
          }
        }
      }

      return newBoard;
    },
    [board],
  );

  const clearLines = useCallback((nextBoard: Board): { newBoard: Board; linesCleared: number } => {
    const filteredRows = nextBoard.filter((row) => row.some((cell) => cell === null));
    const linesCleared = BOARD_HEIGHT - filteredRows.length;

    while (filteredRows.length < BOARD_HEIGHT) {
      filteredRows.unshift(Array.from({ length: BOARD_WIDTH }, () => null));
    }

    return { newBoard: filteredRows, linesCleared };
  }, []);

  const movePieceDown = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const newPosition = { ...currentPiece.position, y: currentPiece.position.y + 1 };

    if (canPlacePiece(currentPiece, newPosition)) {
      setCurrentPiece({ ...currentPiece, position: newPosition });
      return;
    }

    const newBoard = placePieceOnBoard(currentPiece);
    const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);

    setBoard(clearedBoard);
    if (linesCleared > 0) {
      setLines((prev) => prev + linesCleared);
      setScore((prev) => prev + linesCleared * 150 * level);
    }

    const nextPiece = createNewPiece();
    if (canPlacePiece(nextPiece, nextPiece.position)) {
      setCurrentPiece(nextPiece);
    } else {
      setGameOver(true);
    }
  }, [
    canPlacePiece,
    clearLines,
    createNewPiece,
    currentPiece,
    gameOver,
    isPaused,
    level,
    placePieceOnBoard,
  ]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!currentPiece || gameOver || isPaused) return;

      switch (event.key) {
        case "ArrowLeft": {
          event.preventDefault();
          const leftPosition = { ...currentPiece.position, x: currentPiece.position.x - 1 };
          if (canPlacePiece(currentPiece, leftPosition)) {
            setCurrentPiece({ ...currentPiece, position: leftPosition });
          }
          break;
        }
        case "ArrowRight": {
          event.preventDefault();
          const rightPosition = { ...currentPiece.position, x: currentPiece.position.x + 1 };
          if (canPlacePiece(currentPiece, rightPosition)) {
            setCurrentPiece({ ...currentPiece, position: rightPosition });
          }
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          movePieceDown();
          break;
        }
        case "ArrowUp":
        case " ": {
          event.preventDefault();
          const rotated = rotatePiece(currentPiece);
          if (canPlacePiece(rotated, rotated.position)) {
            setCurrentPiece(rotated);
          }
          break;
        }
      }
    },
    [canPlacePiece, currentPiece, gameOver, isPaused, movePieceDown, rotatePiece],
  );

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const interval = setInterval(() => {
      movePieceDown();
    }, Math.max(120, 900 - (level - 1) * 90));

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, isPaused, level, movePieceDown]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    setLevel(Math.floor(lines / 8) + 1);
  }, [lines]);

  const startGame = () => {
    setBoard(createEmptyBoard());
    const freshPiece = createNewPiece();
    setCurrentPiece(freshPiece);
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
  };

  const renderBoard = () => {
    const displayBoard = board.map((row) => row.map((cell) => (cell ? { ...cell } : null)));

    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (!currentPiece.shape[y][x]) continue;
          const boardY = currentPiece.position.y + y;
          const boardX = currentPiece.position.x + x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            displayBoard[boardY][boardX] = { color: currentPiece.color };
          }
        }
      }
    }

    return displayBoard.map((row, y) => (
      <div key={`row-${y}`} className="flex">
        {row.map((cell, x) => (
          <div
            key={`cell-${y}-${x}`}
            className="w-6 h-6 border border-white/15 bg-slate-800/80"
            style={
              cell
                ? {
                    background: `radial-gradient(circle at 30% 30%, ${cell.color}, #0c1a33)`,
                    boxShadow: `0 0 14px ${cell.color}75`,
                  }
                : { background: "linear-gradient(135deg, rgba(37,58,89,0.7), rgba(21,32,55,0.7))" }
            }
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-2xl font-black shadow-[0_15px_40px_rgba(14,165,233,0.35)]">
              W
            </div>
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-cyan-400/50 via-purple-500/40 to-blue-600/50 blur-2xl" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">WeShow Playlab</p>
            <h2 className="text-3xl font-black tracking-tight text-white">
              Neon Block&nbsp;
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Challenge
              </span>
            </h2>
            <p className="text-sm text-white/70">Фирменная аркада из нашей лаборатории интерактива</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 shadow-inner">
          Управляйте стрелками, вращайте стрелкой вверх или пробелом, зафиксируйте максимум линий!
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-b from-[#070d1d] via-[#0b152d] to-[#111a33] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.8)]">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-2xl" />
            <div className="relative rounded-[18px] border border-white/15 bg-[#0c1529] p-3 shadow-inner shadow-black/40 backdrop-blur">
              {renderBoard()}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-white/60">Счёт</p>
              <p className="text-2xl font-semibold text-white">{score}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-white/60">Уровень</p>
              <p className="text-2xl font-semibold text-white">{level}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-white/60">Линии</p>
              <p className="text-2xl font-semibold text-white">{lines}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-white/80 uppercase">Управление</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>← → — перемещение фигуры</li>
              <li>↓ — ускоренное падение</li>
              <li>↑ или Space — вращение</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={startGame}
              className="h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-base font-semibold text-white hover:from-cyan-400 hover:to-purple-500"
            >
              {gameStarted ? "Заново" : "Старт"}
            </Button>
            <Button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              disabled={!gameStarted || gameOver}
              variant="ghost"
              className="h-12 rounded-2xl border border-cyan-200/40 bg-white/5 text-base font-semibold text-white hover:bg-cyan-200/10 disabled:opacity-50"
            >
              {isPaused ? "Продолжить" : "Пауза"}
            </Button>
          </div>

          {gameOver && (
            <div className="rounded-3xl border border-red-500/50 bg-red-500/10 p-4 text-center text-sm text-red-200">
              Игра окончена! Ваш счёт: <span className="font-semibold">{score}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface BlockGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlockGameModal = ({ isOpen, onClose }: BlockGameModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-[130] w-full max-w-5xl rounded-[32px] border border-white/10 bg-[#05060d] p-8 shadow-[0_35px_120px_rgba(15,23,42,0.9)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Закрыть игру"
        >
          <X className="h-5 w-5" />
        </button>
        <BlockGame />
      </div>
    </div>
  );
};

export default BlockGameModal;

