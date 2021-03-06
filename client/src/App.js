import './App.css';
import { Route, Switch } from 'react-router-dom';
import {Header, Main} from './component/Main.jsx'
import {Auth} from './component/Auth.jsx'
import {Board} from './component/Board.jsx'
import {Admin} from './component/Admin.jsx'
import {Product} from './component/Product.jsx'
import {MyPage} from './component/MyPage.jsx'
import {AdminDetail} from './component/AdminDetail.jsx'


function App() {

  return (
    <div className="App">
      <Header />
       <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/auth" component={Auth}/>
        <Route exact path="/board" component={Board}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/product" component={Product}/>
        <Route exact path="/mypage" component={MyPage}/>
        <Route exact path="/admin/admindetail" component={AdminDetail}/>
      </Switch>
      {/* <footer>푸터영역</footer> */}
    </div>
  );
}

export default App;
