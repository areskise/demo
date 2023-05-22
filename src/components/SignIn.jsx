import { app, firestore } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(res => {
                console.log(res.user);
                // navigate('/')
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    return (
        <div className="body-signin">
            <div className="form-signin">
                    <form onSubmit={handleSubmit}>
                        <h3>Đăng nhập</h3>
                        <div>
                            <input name="email" type="email" placeholder="Email"/>
                        </div>
                        <div>
                            <input name="password" type="password" placeholder="Password"/>
                        </div>
                        <div>
                            <button type="submit">Đăng nhập</button>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default SignIn;