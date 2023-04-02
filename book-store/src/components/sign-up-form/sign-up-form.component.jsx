import {useState} from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFileds, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFileds;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFileds, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if(password !== confirmPassword){
            alert("Ups, your paswords do not match");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            const userDocRef = await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Email is already in use');
            }
            console.log('User creation error',error)
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                  label='Display Name'
                  type='text'
                  required
                  onChange={handleChange}
                  name='displayName'
                  value={displayName}
                />

                <FormInput
                  label='Email'
                  type='email'
                  required
                  onChange={handleChange}
                  name='email'
                  value={email}
                />

                <FormInput
                  label='Password'
                  type='password'
                  required
                  onChange={handleChange}
                  name='password'
                  value={password}
                />

                <FormInput
                  label='Confirm Password'
                  type='password'
                  required
                  onChange={handleChange}
                  name='confirmPassword'
                  value={confirmPassword}
                />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default SignUpForm