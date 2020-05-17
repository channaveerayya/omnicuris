import React, { Component } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import facebook from '../assets/facebook.png'
import linkedIn from '../assets/linkedIn.png'
import twitter from '../assets/twitter.png'
import whatsapp from '../assets/whatsapp.png'
import youtub from '../assets/youtub.png'

import styles from './Description.module.scss'
class Description extends Component {
    render() {
        return (
            this.props.loading ? <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                variant="primary"
            />
                :
                (<Card className={styles.card} >
                    <Card.Header className={styles.header}>Description
                    <div className={styles.iconGroup}>
                            <img src={facebook} alt="" />
                            <img src={twitter} alt="" />
                            <img src={linkedIn} alt="" />
                            <img src={youtub} alt="" />
                            <img src={whatsapp} alt="" />
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{this.props.description.description}</Card.Title>
                    </Card.Body>
                </Card>
                )
        )
    }
}
export default Description