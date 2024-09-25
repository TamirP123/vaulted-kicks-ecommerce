import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Header = () => {
  // ... existing code ...

  return (
    <header>
      <nav>
        {/* ... other navigation items ... */}
        {Auth.loggedIn() && (
          <Link to="/favorites">Favorites</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;