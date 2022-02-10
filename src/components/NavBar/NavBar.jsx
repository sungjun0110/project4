import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
    function handleLogOut() {
        // Delegate to the users-service
        userService.logOut();
        // Update state will also cause a re-render
        setUser(null);
    }

    return (
        <nav>
            <Link to="/">Items</Link>
            &nbsp; | &nbsp;
            <Link to="/myitems">My Items</Link>
            &nbsp;&nbsp;Wlcome, {user.name}!
            &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    );
}