import React from "react";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <h1 ><Link to="/homepage" >MyBank</Link></h1>
      
    </div>
  );
}

export default Header;
