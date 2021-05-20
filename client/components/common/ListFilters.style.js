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
   appearance: none;
   padding: 0 16px 0 8px;
   background: url(/images/select-arrow.svg) no-repeat right / 11px;

   & + * {
      margin-left: 12px;
   }
`;
