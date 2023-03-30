import { Link } from 'react-router-dom';

function Navbar() {
  const role = sessionStorage.getItem('role');

  return (
    <nav className="navbar displatinlineblock">
      <ul>
        {role === 'manager' && (
          <li><Link to="/register">Register</Link></li>
        )}
        <li><Link to="/cards">Cards</Link></li>
        <li><Link to="/passbook">Passbook</Link></li>
        <li><Link to="/loan">Loan</Link></li>
        <li><Link to="/banktransaction">Bank Transaction</Link></li>
        <li><Link to="/beneficiaries">Beneficiaries</Link></li>
        <li><Link to="/accounts">Account</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/signout">Sign Out</Link></li>
        <li><Link to=""></Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
