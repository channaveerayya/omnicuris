import React, { Component } from 'react'
import { Media } from 'react-bootstrap'
import styles from './Lesson.module.scss'
import Chapter from './Chapter';
class Lessons extends Component {
    render() {
        return (
            this.props.lessonDetails ? <div >
                {this.props.lessonDetails.map((les, idx) => {
                    return <div className={styles.container} key={idx}>
                        <Media
                            className={styles.Media}
                        >
                            <img
                                width={54}
                                height={54}
                                src={les.userChapterDetails[0].chapterExperts[0].profilePic}
                                alt="Generic placeholder"
                            />
                            <Media.Body className={styles.mediaBody}>
                                <div className={styles.title}>
                                    {`Lesson : ${idx + 1}`}
                                    <span>{les.title}</span>
                                </div>
                            </Media.Body>
                        </Media>
                        <Chapter userChapterDetails={les.userChapterDetails} />
                    </div>
                })
                }
            </div>
                : null

        )
    }
}

export default Lessons