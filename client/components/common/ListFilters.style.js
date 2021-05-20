import styled from 'styled-components';

export const Filters = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
`;

export const Select = styled.select`
   border: 0;
   font-size: 14px;
   outline: none;
   & + *{
      margin-left: 12px;
   }
`;
