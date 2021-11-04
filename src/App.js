import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import logo from './assets/img/logo-pokemon.png';

const App = () => {

  return (
    <>
      <header className = 'App-header'>
        <img src = {logo} alt = 'logo-pokemon'></img>
      </header>
      <div className = 'line-header'></div>
      <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
