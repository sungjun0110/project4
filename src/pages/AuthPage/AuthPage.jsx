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
            <h1>AuthPage</h1>
            { isSignUpActive 
                ? <SignUpForm setUser={setUser} />
                : <LoginForm setUser={setUser} />
            }
            <button onClick={activeHandler}>
                { isSignUpActive
                    ? 'Click to Sign Up'
                    : 'Click to Log In'
                }
            </button>
        </main>
    );
}