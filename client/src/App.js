import './App.css';
import { Route, Switch } from 'react-router-dom';
import {Header, Main} from './component/Main.jsx'
import {Auth} from './component/Auth.jsx'
import {Board, BoardUpdate} from './component/Board.jsx'
import {Admin} from './component/Admin.jsx'
import {Product} from './component/Product.jsx'
import {MyPage} from './component/MyPage.jsx'
import {AdminUpdate} from './component/AdminUpdate.jsx'
import {QnaAnswer} from './component/QnaAnswer.jsx'
import {UserQnaAnswer} from './component/QnaDetail.jsx'


function App() {

  return (
    <div className="App">
      <Header />
       <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/auth" component={Auth}/>
        <Route exact path="/board" component={Board}/>
        <Route exact path="/board/BoardUpdate/:id" component={BoardUpdate}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/admin/AdminUpdate/:id" component={AdminUpdate}/>
        <Route exact path="/admin/QnaAnswer/:id" component={QnaAnswer}/>
        <Route exact path="/product" component={Product}/>
        <Route exact path="/mypage" component={MyPage}/>
        <Route exact path="/mypage/UserQnaAnswer/:id" component={UserQnaAnswer}/>
      </Switch>
      {/* <footer>푸터영역</footer> */}
    </div>
  );
}

export default App;
