import React, { Component } from 'react'
import { Media } from 'react-bootstrap'
import styles from './Chapter.module.scss'
import axios from "../../axios-interceptor";
import { connect } from 'react-redux';
import * as ACTIONS from '../../store/actions/videosData'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
class Chapter extends Component {
    playChapter = (chpt, idx) => {
        this.props.setChapterDetails(chpt, { userChapterDetails: this.props.userChapterDetails, palyIndex: idx, showHide: false })
    }
    render() {
        return (
            this.props.userChapterDetails.map((chpt, idx) => {
                return <div className={styles.container} key={idx}>
                    <Media
                        className={styles.Media}
                        onClick={() => {
                            this.playChapter(chpt, idx)
                        }}
                    >
                        <img
                            width={40}
                            height={40}
                            src={chpt.chapterExperts[0].profilePic}
                            alt="Generic placeholder"
                        />
                        <Media.Body className={styles.mediaBody}>
                            <div className={styles.title}>
                                {`Chapter : ${idx + 1}`}
                                <span>{chpt.title}</span>
                            </div>
                        </Media.Body>
                    </Media>
                </div>
            })
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setChapterDetails: (item, chList) => dispatch(ACTIONS.setChapterDetails(item, chList))
    }
}
export default connect(null, mapDispatchToProps)(withErrorHandler(Chapter, axios))