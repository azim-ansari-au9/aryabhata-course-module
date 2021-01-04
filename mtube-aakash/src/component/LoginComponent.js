import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import {connect} from 'react-redux'
import config from '../config.json';
import {AUTH_ACTION} from '../actions/actionfile'

class Login extends Component{
    componentDidMount(){
        const user = JSON.parse(localStorage.getItem('udetails'));
        if(user){
            this.props.dispatch({
                type:AUTH_ACTION.LOGIN,
                payload: user.token
            })
        }
    }
    googleLogin = (response) => {
        if(!response || !response.accessToken){
            alert("Error While Login")
        }
        const details = {
            user: response.profileObj,
            token: response.accessToken
        }
        localStorage.setItem('udetails',JSON.stringify(details));
        //console.log(response)
        this.props.dispatch({
            type:AUTH_ACTION.LOGIN,
            payload: details.token
        })
    }

    logout = () => {
        localStorage.removeItem('udetails');
        this.props.dispatch({
            type:AUTH_ACTION.LOGOUT
        })
    }
    render(){
      

        return(
           <React.Fragment>
               <span style={{color:'white'}}>Name</span>
            {
                !this.props.auth.isAuth && 
                <GoogleLogin
                clientId={config.clientId}
                buttonText="Login"
                onSuccess={this.googleLogin}
                onFailure={this.googleLogin}
                isSignedIn={true}
            />
            }
            {
             this.props.auth.isAuth && 
                <GoogleLogout
                clientId={config.clientId}
                buttonText="Logout"
               onLogoutSuccess={this.logout}
               />
            }
            
            
            </React.Fragment>
            
        )
    }
}

function mapStateToProps(state){
    console.log("In State of mapStateToProps",state)
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps)(Login);