import React, {Component} from 'react';
import {Svg} from 'expo';
import {Animated} from 'react-native';

const {Circle} = Svg;

export default class CircleLoader extends Component {
    state = {
        progress: new Animated.Value(360),
        progressValue: 100
    };

    componentDidMount() {
        this.start = this.startAnimation;
        this.stop = this.stopAnimation;
    }

    componentWillUnmount() {
        this.animation && this.animation.removeListener();
    }

    startAnimation = () => {
        this.animation = Animated.timing(this.state.progress, {
            toValue: 0,
            duration: 5000
        }).start(() => {
            this.state.progress.setValue(360);
        });

        this.state.progress.addListener((v) => {
            this.setState({progressValue: v.value});
        });
    };

    stopAnimation = () => {
        if (this.animation) {
            this.animation.stop();
            this.state.progress.removeListener();
        }
    };

    render() {
        return (
            <Svg key={this.state.progress} width='40' height='40' viewBox='0 0 120 120'>
                <Circle
                    cx='60'
                    cy='60'
                    r='54'
                    fill='none'
                    stroke={this.props.strokeColor}
                    strokeWidth={this.props.strokeWidth}
                    strokeDasharray='360'
                    strokeDashoffset={this.state.progressValue}
                    strokeLinecap='round'
                />
            </Svg>
        );
    }
}
