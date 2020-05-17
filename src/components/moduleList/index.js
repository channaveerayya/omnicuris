import React, { Component } from 'react'
import { Media, Spinner } from 'react-bootstrap'
import axios from "../../axios-interceptor";
import { connect } from 'react-redux';
import * as ACTIONS from '../../store/actions/videosData'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import styles from './ModuleList.module.scss'
import Lessons from './Lessons';
class ModuleList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modules: [],
            requestId: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.loading) {
            const updateModules = props.moduleDetails.filter(mod => mod.id === state.requestId);
            return {
                modules: props.modules.map(item => {
                    if (item.id === state.requestId) {
                        return {
                            ...item,
                            ...updateModules[0]
                        }
                    } else return {
                        ...item
                    }
                })
            }
        } else return{
            ...state
        }
    }

    getModuleDetails = (id) => {
        this.setState({ [id]: !this.state[id], requestId: id })
        this.props.getModuleDetails({
            params: {
                "courseSlug": "thyroid-in-pregnancy",
                "moduleId": id
            }
        }
        )
    }
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
                    <div>
                        <div className={styles.container}>
                            <Media
                                className={styles.Media}
                                onClick={() => {
                                    this.props.setChapterDetails({ content: this.props.introData.introVideo, title: 'Introduction' })
                                }}
                            >
                                <img
                                    width={64}
                                    height={64}
                                    src={this.props.introData.image}
                                    alt="Generic placeholder"
                                />
                                <Media.Body className={styles.mediaBody}>
                                    <div className={styles.title}>{"Introduction"}
                                    </div>
                                </Media.Body>
                            </Media>

                        </div>
                        {this.state.modules.map((mod,idx) => {
                            return <div className={styles.container} key={idx}>
                                <Media
                                    className={styles.Media}
                                    onClick={() => {
                                        this.getModuleDetails(mod.id)
                                    }}
                                >
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
                                <Lessons lessonDetails={mod.lessonDetails} />
                            </div>
                        })
                        }
                    </div>


                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        moduleDetails: state.videosData.moduleDetails,
        introData: state.videosData.introData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getModuleDetails: (params) => dispatch(ACTIONS.getModuleDetails(params)),
        setChapterDetails: (item) => dispatch(ACTIONS.setChapterDetails(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ModuleList, axios))