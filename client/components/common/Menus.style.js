import styled from 'styled-components';

export const MenuWrap = styled.div`
   display: flex;
   padding: 0 0 24px 0;
`;

export const Menu = styled.button`
   flex: 1;
   height: 50px;
   font-size: 18px;
   font-weight: 500;
   background-color: #eee;
   color: #999;
   box-shadow: 0px 3px 6px rgba(0,0,0,.25);
   & + button{
      border-left: 0;
   }
   &.active{
      background-color: #fff;
      color: #333;
   }
`;

