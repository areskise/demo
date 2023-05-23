import { app, firestore } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const SignIn = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
	const cookies = new Cookies();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(res => {
                if(res.user.emailVerified) {
                    const user = res.user
                    const token = res.user.accessToken
                    cookies.set("user", user)
                    cookies.set("token", token)
                    navigate('/')
                } else {
                    sendEmailVerification(res.user)
                        .then(() => {
                            alert(`Verification email sent to ${res.user.email}`)
                        });

                }
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    const withGoogle = () => {
        signInWithPopup(auth, provider)
            .then(res => {
                const credential = GoogleAuthProvider.credentialFromResult(res);
                const token = credential.accessToken;
                const user = res.user;
                cookies.set("user", user)
                cookies.set("token", token)
                navigate('/')
            })
            .catch(err => {
                alert(err.message)
            })
    }

    return (
        <div className="body-signin">
            <div className="form-signin">
                    <form onSubmit={handleSubmit}>
                        <h3>Sign In</h3>
                        <div>
                            <input name="email" type="email" placeholder="Email"/>
                        </div>
                        <div>
                            <input name="password" type="password" placeholder="Password"/>
                        </div>
                        <div>
                            <a href="/signup">No account yet? Sign up!</a>
                        </div>
                        <div>
                            <button type="submit">Sign In</button>
                        </div>
                    </form>
                    <p>or sign in with</p>
                    <div>
                        <button onClick={withGoogle}>Continue with Google</button>
                    </div>
            </div>
        </div>
    )
}

export default SignIn;