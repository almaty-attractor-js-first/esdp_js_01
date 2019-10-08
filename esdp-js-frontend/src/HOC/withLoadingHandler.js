import React, { Component, Fragment } from 'react';
import IndeterminateLinearProgress from "../components/UI/Preloader.js";
import {red} from "@material-ui/core/colors";

const withLoadingHandler = (WrappedComponent, axios) => {
	return class extends Component {
		
		constructor(props) {
			super(props);
			this.state = {
				loading: false,
			};
			
			this.interceptorRes = axios.interceptors.response.use(res => {
				this.setState({loading: false});
				return res;
			},(err) => {
				this.setState({loading: false});
				return Promise.reject(err);
			});
			
			this.interceptorReq = axios.interceptors.request.use(req => {
				this.setState({loading: true});
				return req;
			},(err) => {
				this.setState({loading: false});
				return Promise.reject(err);
			});
		}
		
		componentWillUnmount() {
			axios.interceptors.response.eject(this.interceptorRes);
			axios.interceptors.request.eject(this.interceptorReq);
		}
		
		render () {
			return (
				<Fragment>
					{this.state.loading ? <IndeterminateLinearProgress /> :
						<div style={{
							height: "4px",
							backgroundColor: red[700],
							position: "fixed",
							top: 0,
							left: 0,
							right: 0,
							zIndex: '555'
					}}/>}
					<WrappedComponent
						{...this.props}
					/>
				</Fragment>)
		}
		
	}
};

export default withLoadingHandler;
