import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from './components/Home';
import Pokedex from './components/Pokedex';
import './scss/app.scss';

const App = () => {

  return (
    <>
      <Router>
        <Header/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/pokedex" component={Pokedex}/>
      </Switch>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
