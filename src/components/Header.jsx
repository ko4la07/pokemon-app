import React from "react";
import {
  Link,
} from "react-router-dom";
import logo from '../assets/img/logo-pokemon.png';

const Header = () => {
return (
  <>
    <header className = 'App-header'>
        <img src = {logo} alt = 'logo-pokemon'></img>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/pokedex'>Pokedex</Link>
          </li>
        </ul>
      </header>
      <div className = 'line-header'></div>
  </>
)
}

export default Header;
