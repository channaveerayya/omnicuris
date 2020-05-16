import React, { Component } from 'react'
import axios from "./axios-interceptor";
import { connect } from 'react-redux';
import * as ACTIONS from './store/actions/videosData'
import withErrorHandler from "./hoc/withErrorHandler/withErrorHandler"
import { Col, Row } from 'react-bootstrap'
import Video from './components/video'
import ModuleList from './components/moduleList'
import styles from './App.module.scss'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            modules: []
        };
    }
    componentDidMount() {
        this.props.getModuleList({ params: { "courseSlug": "thyroid-in-pregnancy" } })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.moduleList) {
            return {
                moduleList: props.moduleList,
                loading: false,
                url: props.moduleList.introVideo,
                modules: props.moduleList.modules,
                name: props.moduleList.name
            }
        }
    }

    render() {
        const { loading, modules, name, url } = this.state
        return (
            <div className={styles.App}>
                <Row>
                    <Col xs={12} md={7}>
                        <div className={styles.title}>
                            {name}
                            <span> title here</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={7}><Video loading={loading} url={url} /></Col>
                    <Col xs={12} md={12} lg={5}> <ModuleList loading={loading} modules={modules} /></Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        moduleList: state.videosData.moduleList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getModuleList: (params) => dispatch(ACTIONS.getModuleList(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(App, axios))