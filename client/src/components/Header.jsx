import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

const Header = () => {
	const cookies = new Cookies();
    const email = cookies.get("email");
    const navigate = useNavigate();

    const logOut = () => {
        cookies.remove("email");
        cookies.remove("token");
        navigate('/signin')
    }

    return (
        <header>
            <ul>
                <li>
                    <a href="/">Films</a>
                </li>
                <li>
                    <a href="/admin">Admin</a>
                </li>
            </ul>
            {!email ?
            <ul>
                <li>
                    <a href="/signup">Sign up</a>
                </li>
                <li>
                    <a href="/signin">Sign In</a>
                </li>
            </ul>
            :
            <ul>
                <li>
                    {email}
                    <a href='/signin' onClick={logOut}>Log Out</a>
                </li>
            </ul>
            }
        </header>
    )
}

export default Header;