import { Component, PropTypes } from 'react'

export default class Controls extends Component {
  static propTypes = {
    onMove: PropTypes.func.isRequired,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKey)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKey)
  }

  onKey = (event) => {
    const { onMove } = this.props
    switch (event.code) {
      case 'ArrowUp':
        return onMove('up')
      case 'ArrowDown':
        return onMove('down')
      case 'ArrowRight':
        return onMove('right')
      case 'ArrowLeft':
        return onMove('left')
    }
  }

  render() {
    return null
  }
}
