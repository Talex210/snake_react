const RIGHT = 'RIGHT';
const LEFT = 'LEFT';
const UP = 'UP';
const DOWN = 'DOWN';
const STOP = 'STOP';
const COLLISION = 'COLLISION';
const EAT_APPLE = 'EAT_APPLE';

let initialState = {
    width: Math.trunc(window.innerWidth / 100) * 100,
    height: Math.trunc(window.innerHeight / 100) * 55,
    blockSize: Math.trunc(window.innerWidth / 60),
    snake: {
        x: [1, 2, 3],
        y: [3, 3, 3]
    },
    apple: {
        x: 5,
        y: 5
    },
    direction: 'right',
    intervalStop: 0,
    isCollision: false,
    snakeLength: 3,
    life: 3,
    speed: 300
}

export const GameAreaReducer = (state = initialState, action) => {
    let widthInBlocks = Math.trunc(state.width / state.blockSize) - 1;
    let heightInBlocks = Math.trunc(state.height / state.blockSize) - 1;
    let headSnakeX = state.snake.x[state.snake.x.length - 1];
    let headSnakeY = state.snake.y[state.snake.y.length - 1];
    let bodySnakeX = state.snake.x.slice(0, state.snake.x.length - 1);
    let bodySnakeY = state.snake.y.slice(0, state.snake.y.length - 1);
    switch (action.type) {
        case RIGHT:
            return {
                ...state,
                snake: {
                    x: [...state.snake.x.slice(1, state.snake.x.length),
                        state.snake.x[state.snake.x.length - 1] + 1],
                    y: [...state.snake.y.slice(1, state.snake.y.length),
                        state.snake.y[state.snake.y.length - 1]]
                },
                direction: 'right'
            }
        case LEFT:
            return {
                ...state,
                snake: {
                    x: [...state.snake.x.slice(1, state.snake.x.length),
                        state.snake.x[state.snake.x.length - 1] - 1],
                    y: [...state.snake.y.slice(1, state.snake.y.length),
                        state.snake.y[state.snake.y.length - 1]]
                },
                direction: 'left'
            }
        case UP:
            return {
                ...state,
                snake: {
                    x: [...state.snake.x.slice(1, state.snake.x.length),
                        state.snake.x[state.snake.x.length - 1]],
                    y: [...state.snake.y.slice(1, state.snake.y.length),
                        state.snake.y[state.snake.y.length - 1] - 1]
                },
                direction: 'up'
            }
        case DOWN:
            return {
                ...state,
                snake: {
                    x: [...state.snake.x.slice(1, state.snake.x.length),
                        state.snake.x[state.snake.x.length - 1]],
                    y: [...state.snake.y.slice(1, state.snake.y.length),
                        state.snake.y[state.snake.y.length - 1] + 1]
                },
                direction: 'down'
            }
        case STOP:
            return {
                ...state,
                intervalStop: action.stop
            }
        case COLLISION:
            for (let i = 0; i < bodySnakeX.length; i++) {
                if ((bodySnakeX[i] === headSnakeX && bodySnakeY[i] === headSnakeY) || (headSnakeX === 0 ||
                    headSnakeY === 0 || headSnakeX === widthInBlocks || headSnakeY === heightInBlocks)) {
                    return {
                        ...state,
                        isCollision: true,
                        life: state.life - 1,
                        snake: {
                            x: [1, 2, 3],
                            y: [3, 3, 3]
                        },
                        snakeLength: 3,
                        direction: 'right',
                        speed: 300
                    }
                }
            }
            return {
                ...state,
                isCollision: false
            }
        case EAT_APPLE:
            for (let i = 0; i < bodySnakeX.length; i++) {
                if (bodySnakeX[i] === state.apple.x && bodySnakeY[i] === state.apple.y) {
                    return {
                        ...state,
                        apple: {
                            y: Math.floor(Math.random() * (heightInBlocks - 2)) + 1,
                            x: Math.floor(Math.random() * (widthInBlocks - 2)) + 1
                        }
                    }
                }
            }
            if (headSnakeX === state.apple.x && headSnakeY === state.apple.y) {
                switch (state.direction) {
                    case 'right':
                        return {
                            ...state,
                            snakeLength: state.snakeLength + 1,
                            speed: state.speed - 25,
                            apple: {
                                y: Math.floor(Math.random() * (heightInBlocks - 2)) + 1,
                                x: Math.floor(Math.random() * (widthInBlocks - 2)) + 1
                            },
                            snake: {
                                x: [...state.snake.x.slice(0, state.snake.x.length),
                                    state.snake.x[state.snake.x.length - 1] + 1],
                                y: [...state.snake.y.slice(0, state.snake.y.length),
                                    state.snake.y[state.snake.y.length - 1]]
                            }
                        }
                    case 'left':
                        return {
                            ...state,
                            snakeLength: state.snakeLength + 1,
                            speed: state.speed - 25,
                            apple: {
                                y: Math.floor(Math.random() * (heightInBlocks - 2)) + 1,
                                x: Math.floor(Math.random() * (widthInBlocks - 2)) + 1
                            },
                            snake: {
                                x: [...state.snake.x.slice(0, state.snake.x.length),
                                    state.snake.x[state.snake.x.length - 1] - 1],
                                y: [...state.snake.y.slice(0, state.snake.y.length),
                                    state.snake.y[state.snake.y.length - 1]]
                            }
                        }
                    case 'up':
                        return {
                            ...state,
                            snakeLength: state.snakeLength + 1,
                            speed: state.speed - 25,
                            apple: {
                                y: Math.floor(Math.random() * (heightInBlocks - 2)) + 1,
                                x: Math.floor(Math.random() * (widthInBlocks - 2)) + 1
                            },
                            snake: {
                                x: [...state.snake.x.slice(0, state.snake.x.length),
                                    state.snake.x[state.snake.x.length - 1]],
                                y: [...state.snake.y.slice(0, state.snake.y.length),
                                    state.snake.y[state.snake.y.length - 1] - 1]
                            }
                        }
                    case 'down':
                        return {
                            ...state,
                            snakeLength: state.snakeLength + 1,
                            speed: state.speed - 25,
                            apple: {
                                y: Math.floor(Math.random() * (heightInBlocks - 2)) + 1,
                                x: Math.floor(Math.random() * (widthInBlocks - 2)) + 1
                            },
                            snake: {
                                x: [...state.snake.x.slice(0, state.snake.x.length),
                                    state.snake.x[state.snake.x.length - 1]],
                                y: [...state.snake.y.slice(0, state.snake.y.length),
                                    state.snake.y[state.snake.y.length - 1] + 1]
                            }
                        }
                    default:
                        return state;
                }
            }
            return state;
        default:
            return state;
    }
}

export const moveRight = () => ({type: RIGHT});
export const moveLeft = () => ({type: LEFT});
export const moveUp = () => ({type: UP});
export const moveDown = () => ({type: DOWN});
export const setStop = (stop) => ({type: STOP, stop});
export const IsThereCollision = () => ({type: COLLISION});
export const moveApple = () => ({type: EAT_APPLE});