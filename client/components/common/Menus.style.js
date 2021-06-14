import styled from 'styled-components';

export const MenuWrap = styled.div`
   display: flex;
   padding: 12px 0 24px 0;
   &:after{
      position: absolute;
      width: 100vw;
      top: 50px;
      left: 0;
      right: 0;
      content:'';
      height: 1px;
      background-color: #ccc;
   }
`;

export const Menu = styled.button`
   color: #999;
   font-size: 18px;
   
   & + button{
      border-left: 0;
      margin-left: 24px;
   }
   &.active{
      background-color: #fff;
      color: #333;
      font-weight: 500;
   }
`;

