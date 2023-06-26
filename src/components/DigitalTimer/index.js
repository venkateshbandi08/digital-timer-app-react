import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    defaultTimeMin: '25',
    timerMinutes: '25',
    timerSeconds: '00',
    isStarted: false,
    isTimeRunning: false,
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick = () => {
    const {timerMinutes, timerSeconds, isStarted, isTimeRunning} = this.state

    if (isStarted && isTimeRunning) {
      let totalSeconds = timerMinutes * 60 + parseInt(timerSeconds)

      if (totalSeconds > 0) {
        totalSeconds -= 1
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60

        this.setState({
          timerMinutes: String(minutes).padStart(2, '0'),
          timerSeconds: String(seconds).padStart(2, '0'),
        })
      } else {
        this.setState({
          timerMinutes: '00',
          timerSeconds: '00',
          isTimeRunning: false,
        })
      }
    }
  }

  onClickStartButton = () => {
    this.setState(prevState => ({
      isStarted: !prevState.isStarted,
      isTimeRunning: !prevState.isTimeRunning,
    }))
  }

  onDecreaseMints = () => {
    const {isTimeRunning} = this.state
    if (!isTimeRunning) {
      this.setState(prevState => ({
        defaultTimeMin: parseInt(prevState.defaultTimeMin) - 1,
        timerMinutes: parseInt(prevState.defaultTimeMin) - 1,
        timerSeconds: '00',
      }))
    }
  }

  onIncreaseMints = () => {
    const {isTimeRunning} = this.state
    if (!isTimeRunning) {
      this.setState(prevState => ({
        defaultTimeMin: parseInt(prevState.defaultTimeMin) + 1,
        timerMinutes: parseInt(prevState.defaultTimeMin) + 1,
        timerSeconds: '00',
      }))
    }
  }

  onClickReset = () => {
    this.setState({
      timerMinutes: '25',
      timerSeconds: '00',
      isStarted: false,
      isTimeRunning: false,
    })
  }

  render() {
    const {
      defaultTimeMin,
      timerMinutes,
      timerSeconds,
      isStarted,
      isTimeRunning,
    } = this.state

    let startPauseText
    let startPauseImgUrl
    let startPauseImgAlt

    if (isStarted) {
      startPauseText = 'Pause'
      startPauseImgUrl =
        'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      startPauseImgAlt = 'pause icon'
    } else {
      startPauseText = 'Start'
      startPauseImgUrl =
        'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      startPauseImgAlt = 'play icon'
    }

    let timeRunningStatus
    if (isTimeRunning) {
      timeRunningStatus = 'Running'
    } else {
      timeRunningStatus = 'Paused'
    }

    return (
      <div className="digital-timer-app-bg">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="digital-timer-content-container">
          <div className="timer-container-bg">
            <div className="timer-container">
              <div className="time-and-status">
                <h1 className="time-timer">
                  {timerMinutes}:{timerSeconds}
                </h1>
                <p className="time-status">{timeRunningStatus}</p>
              </div>
            </div>
          </div>
          <div className="timer-operations-container">
            <div className="start-pause-reset-container">
              <button
                className="start-pause-button"
                type="button"
                onClick={this.onClickStartButton}
              >
                <img
                  src={startPauseImgUrl}
                  alt={startPauseImgAlt}
                  className="start-pause-icon"
                />
                <p className="start-pause-text">{startPauseText}</p>
              </button>
              <button
                className="reset-button"
                type="button"
                onClick={this.onClickReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="reset-icon"
                />
                <p className="reset-text">Reset</p>
              </button>
            </div>
            <p className="set-timer-limit-text">Set Timer Limit</p>
            <div className="set-time-container">
              <button
                className="negative-button"
                type="button"
                onClick={this.onDecreaseMints}
              >
                -
              </button>
              <p className="time-minutes"> {defaultTimeMin} </p>
              <button
                className="positive-button"
                type="button"
                onClick={this.onIncreaseMints}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
