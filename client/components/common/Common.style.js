import styled from 'styled-components';

export const Currency = styled.span`
   &:before{
      content: '${props => props.currency === 'krw' ? '￦' : '＄'}';
      line-height: 0;
   }
`

export const Percent = styled.span`
   font-weight: 500;
   &.falling{
      color: rgba(37,99,235,1);
   }
   &.rising{
      color: rgba(220,38,38,1);
      
   }
`
export const Loading = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   
   display: none;
   align-items: center;
   justify-content: center;

   background: rgba(0,0,0,.3);
   font-size: 40px;
   font-weight: 500;
   color: #fff;
   
   transition: all .3s;
   opacity: 0;
   z-index: 1;
   
   &.active{
      display: flex;
   }

   &.animate{
      opacity: 1;
   }

`;

export const More = styled.button`
   width: 100%;
   height: 50px;
   background-color: #fff;
   border-bottom: 1px solid #ddd;
`;
