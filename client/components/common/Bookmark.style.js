import styled from 'styled-components';

export const Star = styled.div`
   display: inline-block;
   width: ${props => (props.size || 24) + 'px'};
   height: ${props => (props.size || 24) + 'px'};
   background: url(/images/star.svg) no-repeat 50% / contain;
   line-height: 1;
   cursor: pointer;
   vertical-align: middle;

   &.on{
      background-image: url(/images/star_filled.svg);
   }
`;
