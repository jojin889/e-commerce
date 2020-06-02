import React from 'react';

import "./sign-in.styles.scss";
import SignInAndSignUpPage from '../../pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils.js";


class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        }
    }

    handleSumbit = async event => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (err) {
            console.log(err)
        }


        this.setState({
            email: " ",
            password: " ",
        })
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your password</span>

                <form onSubmit={this.handleSumbit}>
                    <FormInput handleChange={this.handleChange} label="email" name="email" type="email" value={this.state.email} required></FormInput>

                    <FormInput handleChange={this.handleChange} label="password" name="password" type="password" value={this.state.password} required></FormInput>

                    <div className="buttons">
                        <CustomButton type="submit"> Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn type="button"> Sign in with Google </CustomButton>
                    </div>

                </form>
            </div>
        )
    }
}

export default SignIn;