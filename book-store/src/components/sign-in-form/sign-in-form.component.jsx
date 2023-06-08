import { useEffect, useState, useContext} from 'react';
import { getRedirectResult } from 'firebase/auth';
import { 
    auth, 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInWithGoogleRedirect,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

import { UserContext } from '../../context/user.context';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFileds, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFileds;

    const { setCurrentUser} = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

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

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const handleSubmit= async (event) => {
        event.preventDefault();

        try {
            const user = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user)
            //console.log(user);
            resetFormFields();
        } catch (error) {
            switch(error.code){
                case 'auth/wrong-password': 
                    alert('Incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('Email not associated with an existing account')
                    break
                default:
                    alert('Unknown error');
                    console.log('Error when signing in: ', error);
                    break
            }
        }
    }

    return (    
    <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <div className='buttons-group'>
                    <Button type='submit'>Submit</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                        Sign In with Google Popup
                    </Button>
                    {/* <Button buttonType='google' onClick={signInWithGoogleRedirect}>
                    Sign In with Google
                    </Button> */}
                </div>
            </form>
        </div>
    )
}

export default SignInForm;