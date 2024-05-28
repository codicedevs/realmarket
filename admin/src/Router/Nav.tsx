import { Link } from "react-router-dom";

export const Nav = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/settings">Settings</Link>
            </li>
            <li>
                <Link to="/route-with-params/3">Route With Params</Link>
            </li>
        </ul>
    </nav>
);