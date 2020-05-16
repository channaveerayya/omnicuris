import React, { Component } from 'react'
import axios from "./axios-interceptor";
import { connect } from 'react-redux';

import * as ACTIONS from './store/actions/videosData'
import withErrorHandler from "./hoc/withErrorHandler/withErrorHandler"
class App extends Component {

  render() { 
    return (
      <h1 onClick={() => this.props.getModuleList({ params: { "courseSlug": "thyroid-in-pregnancy" } })}>
        getModuleList
      </h1>
    )
  }
}

const mapStateToProps = state => {
  return {
    moduleList: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getModuleList: (params) => dispatch(ACTIONS.getModuleList(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(App, axios))