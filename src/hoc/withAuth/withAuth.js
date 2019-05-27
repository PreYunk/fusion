import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const withAuth = (ProtectedComponent) => {
    return class extends Component {

        state = {
            verified: true,
        };

        componentDidMount() {
            const headers = {
                'Authorization': 'Bearer '+localStorage.getItem('token')
            };
            axios.get('/verifyToken',{headers})
                .then(res => {
                    console.log(res.data.message);
                    this.setState({verified: res.data.success});
                })
                .catch(err => console.log(err));
        }

        render() {
            if(this.state.verified) {
                return (
                    <Fragment>
                        <ProtectedComponent {...this.props}/>
                    </Fragment>
                );
            }
            else {
                return <Redirect to='/login'/>
            }


        }
    }
};

export default withAuth;