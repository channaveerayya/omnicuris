import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import styles from './Video.module.scss'
class Video extends Component {
    onEnded = () => {
        this.props.isEnd(true)
    }
    render() {
        return (
            this.props.loading ?
                <div className={styles.loading}>

                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        variant="primary"
                    /> Loading...
                </div> :
                <ReactPlayer
                    url={this.props.url}
                    playing
                    controls
                    light
                    width='unset'
                    height='100%'
                    className={styles.video}
                    onEnded={this.onEnded}
                />
        )
    }
}

export default Video