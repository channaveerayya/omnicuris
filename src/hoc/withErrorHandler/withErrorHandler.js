import React, { Component, Fragment } from 'react'
import { Modal } from 'react-bootstrap'

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			showHide: null
		};

		constructor(props) {
			super(props)
			this.reqInterceptor = axios.interceptors.request.use(req => {
				req.headers = { 'hk-access-token': '89e684ac-7ade-4cd8-bbdf-419a92f4cc5f' }
				this.setState({ showHide: false });
				return req

			})
			this.resInterceptor = axios.interceptors.response.use(res => res, error => {
				this.setState({ showHide: true, error: error });
			});
		}
		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.request.eject(this.resInterceptor);
		}

		handleModalShowHide() {
			this.setState({ showHide: false })
		}
		render() {
			const { error, showHide } = this.state
			console.log(this.state);
			return (
				<Fragment>
					<Modal show={showHide} onHide={() => this.handleModalShowHide()}>
						<Modal.Header closeButton onClick={() => this.handleModalShowHide()} style={{ "color": "#721c24", "backgroundColor": "#f8d7da" }}>
							<Modal.Title>
								{
									showHide ? error.message : null
								}
							</Modal.Title>
						</Modal.Header>
						<Modal.Body style={{ "color": "#721c24" }}>
							{showHide && error.response ? error.response.data.message : null}
						</Modal.Body>
					</Modal>
					<WrappedComponent {...this.props} />
				</Fragment>
			)
		}
	}
}
export default withErrorHandler
