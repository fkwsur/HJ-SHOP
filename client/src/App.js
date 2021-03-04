import './App.css';
import { Route, Switch } from 'react-router-dom';
import {Header, Main} from './component/Main.jsx'
import {Auth} from './component/Auth.jsx'
import {Board} from './component/Board.jsx'
import {Admin} from './component/Admin.jsx'


function App() {

  return (
    <div className="App">
      <Header />
       <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/auth" component={Auth}/>
        <Route exact path="/board" component={Board}/>
        <Route exact path="/admin" component={Admin}/>
      </Switch>
    </div>
  );
}

export default App;
