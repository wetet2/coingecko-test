import React from 'react';
import { connect } from 'react-redux';
import { addToast } from '../reducer/toastReducer';
import * as S from './Toast.style';

import Toast from './Toast';

class ToastWrap extends React.Component {

   constructor() {
      super();
      this.state = {};
      this.refToastWrap = React.createRef();
   }

   componentDidUpdate() {
      if (this.props.message && this.props.message.trim().length > 0) {
         this.makeToast(this.props.message);
      }
   }

   toastMargin = 12;
   makeToast = (message) => {
      let newToast = new Toast(message);
      
      // box 위치 계산
      
      // let toastCount = this.refToastWrap.current.querySelectorAll('.toast').length;
      // let bottom = (toastCount * 50 + toastCount * this.toastMargin + this.toastMargin);
      // newToast.setBottom(bottom);
      
      newToast.appendTo(this.refToastWrap.current)
      newToast.show();      
      setTimeout(() => {
         newToast.hide();
      }, 3000)
   }

   render() {
      return <S.ToastWrap ref={this.refToastWrap} />
   }
}
const mapStateToProps = ({ toast }) => ({
   message: toast.message,
})
export default connect(
   mapStateToProps,
   null
)(ToastWrap);
