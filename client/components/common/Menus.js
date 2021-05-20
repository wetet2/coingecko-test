import React from 'react';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';

import * as S from './Menus.style';

class Menus extends React.Component {

   constructor() {
      super();
      this.state = {
         tabs: [
            { text: '가상자산 시세목록', value: 1, pushPage: '/markets' },
            { text: '북마크 목록', value: 2, pushPage: '/bookmarks' },
         ],
      }
      this.refTabs = React.createRef();
   }

   onClickTab = (evt, tab) => {
      if (tab.pushPage) this.props.history.push(tab.pushPage);
   }

   render() {
      const { tabs } = this.state;
      return (
         <S.MenuWrap ref={this.refTabs}>
            {
               tabs.map(tab => (
                  <S.Menu key={tab.value} 
                     className={cn({ 'active': location.pathname === tab.pushPage })} 
                     onClick={evt => this.onClickTab(evt, tab)}>
                     {tab.text}
                  </S.Menu>
               ))
            }
         </S.MenuWrap>
      )
   }
}
export default withRouter(Menus);
