import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect, } from 'react-router-dom';
import BookmarksComponent from '../components/BookmarksComponent';
import CoinDetailComponent from '../components/CoinDetailComponent';
import MarketsComponent from '../components/MarketsComponent';
import Menus from '../components/common/Menus';

import ToastWrap from './ToastWrap';
import Loading from './Loading';
import * as A from './Layout.style';

class App extends React.Component {

   constructor() {
      super();
   }

   render() {
      return (
         <>
            <BrowserRouter>
               <A.Layout>

                  <Menus />
                  <Suspense fallback={<div className="k-suspense"><div className="loader"></div></div>}>
                     <Switch>
                        {/* <Route exact path={`/`} component={HomeComponent} /> */}
                        <Redirect exact path={'/'} to='/markets'></Redirect>
                        <Redirect exact path={'/coins'} to='/markets'></Redirect>
                        <Route path={`/markets`} component={MarketsComponent} />
                        <Route path={`/bookmarks`} component={BookmarksComponent} />
                        <Route path={`/coins/:coinId`} component={CoinDetailComponent} />
                     </Switch>
                  </Suspense>
                  
               </A.Layout>
            </BrowserRouter>

            <Loading />
            <ToastWrap />

         </>
      )
   }
}

export default App;
