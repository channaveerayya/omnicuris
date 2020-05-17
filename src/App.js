import React, { Component } from 'react'
import axios from "./axios-interceptor";
import { connect } from 'react-redux';
import * as ACTIONS from './store/actions/videosData'
import withErrorHandler from "./hoc/withErrorHandler/withErrorHandler"
import { Col, Row, Modal } from 'react-bootstrap'
import Video from './components/video'
import ModuleList from './components/moduleList'
import Description from './components/description'
import ExpertPanel from './components/ExpertPanel';
import styles from './App.module.scss'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            modules: [],
            showHide: false
        };
    }
    componentDidMount() {
        this.props.getModuleList({ params: { "courseSlug": "thyroid-in-pregnancy" } })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.moduleList) {
            return {
                moduleList: props.moduleList && props.moduleList,
                loading: false,
                url: props.chapterDetail ? props.chapterDetail.content : '',
                modules: props.moduleList && props.moduleList.modules,
                name: props.name && props.name,
                title: props.chapterDetail ? props.chapterDetail.title : '',
                showHide: props.chList && props.chList.showHide
            }
        } else return {  ...state}
       
    }
    handleModalShowHide = () => {
        this.setState({ showHide: false })
        this.isEnd(false)
    }
    isEnd = (open) => {
        this.setState({ showHide: open })
        const { chList } = this.props
        if (chList) {
            this.props.setChapterDetails(chList.userChapterDetails[chList.palyIndex],
                {
                    userChapterDetails: this.props.userChapterDetails,
                    palyIndex: chList.palyIndex, showHide: open
                })
        } else {
            this.props.setChapterDetails(this.props.chapterDetail, { userChapterDetails: this.props.chapterDetail, palyIndex: 0, showHide: true })
        }

        //Auto play
        // if (chList.userChapterDetails.length-1 > chList.palyIndex) {
        //     const chpt = chList.userChapterDetails[chList.palyIndex + 1]
        //     this.props.setChapterDetails(chpt, { userChapterDetails: this.props.userChapterDetails, palyIndex: chList.palyIndex + 1, showHide: true})
        // }
    }

    render() {
        const { loading, modules, name, url, title } = this.state
        return (
            <div className={styles.App}>
                <Row>
                    <Col xs={12} md={7}>
                        <div className={styles.title}>
                            {name}
                            <span> {title}</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={7}><Video loading={loading} url={url} isEnd={this.isEnd} /></Col>
                    <Col xs={12} md={12} lg={5}> <ModuleList loading={loading} modules={modules} /></Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={7}>
                        <Description
                            loading={loading}
                            description={this.props.moduleList} />
                    </Col>
                </Row>
                <Row>
                    <ExpertPanel />
                </Row>
                <Modal show={this.state.showHide} onHide={() => this.handleModalShowHide()}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()} style={{ "color": "#721c24", "backgroundColor": "#f8d7da" }}>
                        <Modal.Title>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <ModuleList loading={loading} modules={modules} />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        moduleList: state.videosData.moduleList,
        chapterDetail: state.videosData.chapterDetail,
        name: state.videosData.name,
        chList: state.videosData.chList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getModuleList: (params) => dispatch(ACTIONS.getModuleList(params)),
        setChapterDetails: (item, chList) => dispatch(ACTIONS.setChapterDetails(item, chList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(App, axios))