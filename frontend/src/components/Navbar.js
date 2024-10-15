import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container">
                {/*  We want to link the h1 to the home page, we also want another link to the raw ingredients page */}
                <h1><Link to="/">Virtual Bartender</Link></h1>
                <nav>
                    <Link to="/raw_ingredients">Ingredients List</Link>
                </nav>
            </div>
        </header>

    );
    }

export default Navbar;