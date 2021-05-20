import React from 'react';
import { connect } from 'react-redux';
import { addToast } from '../../reducer/toastReducer';

import cn from 'classnames';
import PropTypes from 'prop-types';
import * as S from './Bookmark.style';
import ls from '../../shared/localStorage';
import { Keyword } from '../../shared/enum';
import utils from '../../utils';

class Bookmark extends React.Component {

   static propTypes = {
      coinInfo: PropTypes.object.isRequired,
      onChange: PropTypes.func,
      size: PropTypes.number,
   }

   constructor(props) {
      super();
      this.state = {
         isOn: false,
         coinId: props.coinInfo.id
      }
   }

   checkOn = () => {
      const { coinId } = this.state;
      return (ls.getItem(Keyword.BOOKMARK) || []).includes(coinId)
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.coidId !== nextProps.coinInfo.id) {
         let coinId = nextProps.coinInfo.id;
         return {
            coinId,
            isOn: (ls.getItem(Keyword.BOOKMARK) || []).includes(coinId)
         }
      }
   }

   onClick = () => {
      let { isOn } = this.state;
      let { coinInfo: ci } = this.props;
      let bookmarks = ls.getItem(Keyword.BOOKMARK) || [];

      isOn = !isOn;
      if (isOn) {
         bookmarks.push(ci.id);
         this.props.addToast(`${ci.name} 북마크가 추가되었습니다.`)
      } else {
         utils.remove(bookmarks, e => e === ci.id);
         this.props.addToast(`${ci.name} 북마크가 해제되었습니다.`)
      }
      ls.setItem(Keyword.BOOKMARK, bookmarks);

      if (this.props.onChange) this.props.onChange(ci, isOn)
      this.setState({ isOn })
   }

   render() {
      const { isOn } = this.state;
      const { size } = this.props;
      return (
         <S.Star size={size} onClick={this.onClick} className={cn({ 'on': isOn })} />
      )
   }
}

const matDispatchToProps = { addToast };
export default connect(
   null,
   matDispatchToProps
)(Bookmark);
