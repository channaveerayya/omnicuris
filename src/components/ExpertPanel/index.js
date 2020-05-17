import React, { Component } from 'react'
import { Col, Card, Row} from 'react-bootstrap';
import axios from "../../axios-interceptor";
import { connect } from 'react-redux';
import * as ACTIONS from '../../store/actions/videosData'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import styles from './ExpertPanel.module.scss';
class ExpertPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ExpertPanel: [],
            loading: true
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.ExpertPanel) {
            return {
                ExpertPanel: props.ExpertPanel.expertDetails,
                loading: false
            }
        } else return{
            ...state
        }
    }

    componentDidMount() {
        this.props.getExpertPanel('thyroid-in-pregnancy/experts')
    }
    render() {
        return (
            <Card className={styles.cardContainer} >
                <Card.Header className={styles.header}>Experts Panel</Card.Header>
                <Card.Body>
                    <Card.Title>
                        <Row>
                        {this.state.ExpertPanel.map((exp,idx )=> {

                            return <Col xs={4} sm={4} md={4} lg={2} className={styles.card} key={idx}>
                                <Card style={{ border: "unset", "padding": " 0 2rem" }} >
                                    <Card.Img variant="top" src={exp.profilePic} />
                                    <Card.Body className={styles.expertName}>
                                        <Card.Title>{exp.expertName}</Card.Title>
                                        <Card.Text className={styles.qualification}>
                                            {exp.qualification}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        })}
                        </Row>
                    </Card.Title>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        ExpertPanel: state.videosData.ExpertPanel
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getExpertPanel: (params) => dispatch(ACTIONS.getExpertPanel(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ExpertPanel, axios))