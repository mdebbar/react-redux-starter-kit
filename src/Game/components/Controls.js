import { Component, PropTypes } from 'react'
import Direction from '../classes/Direction'

const keyCodeToDirection = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowRight: 'right',
  ArrowLeft: 'left',
}

export default class Controls extends Component {
  static propTypes = {
    enabled: PropTypes.bool.isRequired,
    onMove: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.updateListener(this.props.enabled)
  }

  componentWillReceiveProps(nextProps) {
    this.updateListener(nextProps.enabled)
  }

  componentWillUnmount() {
    this.updateListener(false)
  }

  updateListener(enabled) {
    if (enabled && !this.listening) {
      this.listening = true
      window.addEventListener('keydown', this.onKey)
    } else if (!enabled && this.listening) {
      this.listening = false
      window.removeEventListener('keydown', this.onKey)
    }
  }

  onKey = (event) => {
    const direction = keyCodeToDirection[event.code]
    if (direction) {
      event.preventDefault()
      this.props.onMove(Direction.fromString(direction))
    }
  }

  render() {
    return null
  }
}
