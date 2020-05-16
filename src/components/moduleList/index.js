import React, { Component } from 'react'
import { Media, Spinner } from 'react-bootstrap'
import styles from './ModuleList.module.scss'
class ModuleList extends Component {
    render() {
        return (
            <div className={styles.ModuleList}>
                {this.props.loading ?
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        variant="primary"
                    /> :
                    this.props.modules.map(mod => {
                        return <Media className={styles.Media}>
                            <img
                                width={64}
                                height={64}
                                src={mod.moduleExperts[0].profilePic}
                                alt="Generic placeholder"
                            />
                            <Media.Body className={styles.mediaBody}>
                                <div className={styles.title}>{mod.title}
                                    <span>{mod.name}</span>
                                </div>
                                <div className={styles.duration}>{mod.durationStr}</div>
                            </Media.Body>
                        </Media>
                    })

                }
            </div>
        )
    }
}

export default ModuleList