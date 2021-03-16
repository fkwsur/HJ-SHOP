import './App.css';
import { Route, Switch } from 'react-router-dom';
import {Header, Main, Footer} from './component/Main.jsx'
import {Auth} from './component/Auth.jsx'
import {Board, BoardUpdate} from './component/Board.jsx'
import {Admin} from './component/Admin.jsx'
import {Product, ProductFormatList} from './component/Product.jsx'
import {MyPage} from './component/MyPage.jsx'
import {AdminUpdate} from './component/AdminUpdate.jsx'
import PayPage from './component/Pay.jsx'
import {QnaAnswer} from './component/QnaAnswer.jsx'
import {UserQnaAnswer} from './component/QnaDetail.jsx'


function App() {

  return (
    <div className="App">
      <Header />
      <div className="main">
         <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/auth" component={Auth}/>
          <Route exact path="/board" component={Board}/>
          <Route exact path="/board/BoardUpdate/:id" component={BoardUpdate}/>
          <Route exact path="/admin" component={Admin}/>
          <Route exact path="/admin/AdminUpdate/:id" component={AdminUpdate}/>
          <Route exact path="/admin/QnaAnswer/:id" component={QnaAnswer}/>
          <Route exact path="/product" component={Product}/>
          <Route exact path="/product/cloth" component={Product}/>
          <Route exact path="/product/appliances" component={Product}/>
          <Route exact path="/product/goods" component={Product}/>
          <Route exact path="/product/food" component={Product}/>
          <Route exact path="/product/cloth/:id" component={ProductFormatList}/>
          <Route exact path="/product/appliances/:id" component={ProductFormatList}/>
          <Route exact path="/product/goods/:id" component={ProductFormatList}/>
          <Route exact path="/product/food/:id" component={ProductFormatList}/>
          <Route exact path="/mypage" component={MyPage}/>
          <Route exact path="/PayPage" component={PayPage}/>
          <Route exact path="/mypage/UserQnaAnswer/:id" component={UserQnaAnswer}/>
         </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;
