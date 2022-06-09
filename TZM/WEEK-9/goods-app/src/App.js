import React from 'react';
import './App.css';
import WrappedNormalLoginForm from './login/login.js';
import { BrowserRouter as Router, Switch, Route, Link ,browserHistory} from 'react-router-dom';
import GoodsInfo from './goodsInfo/GoodsInfo';

function App() {
  return (
    <Router>
   <Switch>
     <Route path='/goodsInfo'>
       <GoodsInfo/>
     </Route>
     <Route exact path={'/'}>
     <WrappedNormalLoginForm/>
     </Route>
   </Switch>
   </Router>
  );
}

export default App;
