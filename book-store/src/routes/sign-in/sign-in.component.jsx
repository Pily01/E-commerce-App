import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

const SignIn = () => {
    return(
        <div className='sign-in-container'>
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default SignIn