import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from './components/Home';
import Pokedex from './components/Pokedex';
import logo from './assets/img/logo-pokemon.png';

const App = () => {

  return (
    <>
      <Router>
      <header className = 'App-header'>
        <img src = {logo} alt = 'logo-pokemon'></img>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/pokedex'>Pokedex</Link>
        </li>
      </header>
      <div className = 'line-header'></div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/pokedex" component={Pokedex}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
