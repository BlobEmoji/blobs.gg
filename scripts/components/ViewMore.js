import React from 'react'

export default class ViewMoreButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: true,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let css_test = this.props.visible === false
    this.setState({ visible: css_test })
  }

  view_more = () => {
    let community_servers = document.getElementsByClassName(
      'community-servers'
    )[0]
    for (let server of community_servers.getElementsByClassName('server')) {
      server.classList.remove('hidden')
    }
    this.setState({ visible: false })
  }
  render() {
    const style = this.state.visible ? {} : { display: 'none' }
    return (
      <button
        className="button view-button"
        onClick={this.view_more}
        style={style}
      >
        View More
      </button>
    )
  }
}
