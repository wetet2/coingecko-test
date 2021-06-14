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

export const More = styled.button`
   width: 100%;
   height: 50px;
   background-color: #fff;
   border-bottom: 1px solid #ddd;
`;
