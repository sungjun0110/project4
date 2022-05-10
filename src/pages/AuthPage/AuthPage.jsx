import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    function activeHandler() {
        setIsSignUpActive(!isSignUpActive);
    }

    return (
        <main>
            <h1>Welcome!</h1>
            { isSignUpActive 
                ? <SignUpForm setUser={setUser} />
                : <LoginForm setUser={setUser} />
            }
            <p>
                Test ID: test@test.com<br/>
                Test Password: 1234
            </p>
            <button onClick={activeHandler}>
                { !isSignUpActive
                    ? 'Sign Up'
                    : 'Sign In'
                }
            </button>
        </main>
    );
}