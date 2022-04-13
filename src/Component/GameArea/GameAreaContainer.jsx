import {connect} from 'react-redux';
import React from 'react';
import {GameArea} from './GameArea';
import {
    IsThereCollision,
    moveApple,
    moveDown,
    moveLeft,
    moveRight,
    moveUp,
    setStartStop,
    setStop
} from '../../Redux/GameAreaReducer';

class GameAreaContainer extends React.Component {
    viewBox = [0, 0, this.props.width, this.props.height];

    right = (isStop2) => {
        if ((this.props.direction !== 'left' && this.props.isStop === false) || !isStop2) {
            clearInterval(this.props.intervalStop);
            let stop = setInterval(this.props.moveRight, this.props.timeout);
            this.props.setStop(stop)
        }
    }

    left = (isStop2) => {
        if ((this.props.direction !== 'right' && this.props.isStop === false)  || !isStop2) {
            clearInterval(this.props.intervalStop);
            let stop = setInterval(this.props.moveLeft, this.props.timeout);
            this.props.setStop(stop)
        }
    }

    up = (isStop2) => {
        if ((this.props.direction !== 'down' && this.props.isStop === false)  || !isStop2) {
            clearInterval(this.props.intervalStop);
            let stop = setInterval(this.props.moveUp, this.props.timeout);
            this.props.setStop(stop)
        }
    }

    down = (isStop2) => {
        if ((this.props.direction !== 'up' && this.props.isStop === false)  || !isStop2) {
            clearInterval(this.props.intervalStop);
            let stop = setInterval(this.props.moveDown, this.props.timeout);
            this.props.setStop(stop)
        }
    }

    stop = () => {
        this.props.setStartStop(true);
        clearInterval(this.props.intervalStop);
    }

    start = (isStop2) => {
        if (this.props.life !== 0) {
            this.props.setStartStop(false);
            switch (this.props.direction) {
                case 'right':
                    this.right(isStop2);
                    return;
                case 'left':
                    this.left(isStop2);
                    return;
                case 'up':
                    this.up(isStop2);
                    return;
                case 'down':
                    this.down(isStop2);
                    return;
                default:
                    return;
            }
        }
    }

    collision = () => {
        this.props.IsThereCollision();
    }

    moveApple = () => {
        this.props.moveApple();
    }

    render() {
        return (
            <GameArea
                viewBox={this.viewBox}
                width={this.props.width}
                blockSize={this.props.blockSize}
                height={this.props.height}
                apple={this.props.apple}
                snake={this.props.snake}
                right={this.right}
                left={this.left}
                up={this.up}
                down={this.down}
                stop={this.stop}
                start={this.start}
                isStop={this.props.isStop}
                isCollision={this.props.isCollision}
                intervalStop={this.props.intervalStop}
                collision={this.collision}
                life={this.props.life}
                timeout={this.props.timeout}
                moveApple={this.moveApple}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        width: state.gameArea.width,
        blockSize: state.gameArea.blockSize,
        height: state.gameArea.height,
        apple: state.gameArea.apple,
        snake: state.gameArea.snake,
        intervalStop: state.gameArea.intervalStop,
        isCollision: state.gameArea.isCollision,
        direction: state.gameArea.direction,
        isStop: state.gameArea.isStop,
        life: state.gameArea.life,
        timeout: state.gameArea.timeout
    }
}

export default connect(mapStateToProps, {
    moveRight, setStop, IsThereCollision, moveUp, moveDown, moveLeft, setStartStop, moveApple
})(GameAreaContainer)