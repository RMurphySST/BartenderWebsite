import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container">
                {/*  We want to link the h1 to the home page, we also want another link to the raw ingredients page */}
                <h1><Link to="/">Virtual Bartender</Link></h1>
                <nav>
                    <div  className="navbar">
                        <Link to="/raw_ingredients">Ingredients List</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                    
                </nav>
            </div>
        </header>

    );
    }

export default Navbar;