import { useEffect, useState} from 'react';
import { getRedirectResult } from 'firebase/auth';
import { 
    auth, 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInWithGoogleRedirect 
} from '../../utils/firebase/firebase.utils'

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFileds, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFileds;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFileds, [name]: value})
    }

    useEffect(() => {
        async function _getRedirectResult() {
            const response = await getRedirectResult(auth);
            if(response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }
        _getRedirectResult();
    }, []);

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (    
    <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
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
            <Button type='submit'>Submit</Button>
            <Button buttonType='google' onClick={logGoogleUser}>
                Sign In with Google Popup
            </Button>
            <Button buttonType='google' onClick={signInWithGoogleRedirect}>
                Sign In with Google Redirect
            </Button>
        </div>
    )
}

export default SignInForm;