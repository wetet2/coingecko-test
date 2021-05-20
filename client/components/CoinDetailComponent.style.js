import styled from 'styled-components';

export const Header = styled.header`
   display: flex;
   align-items: center;

   img{
      max-height: 36px;
   }

   h3{
      flex: 1;
      font-size: 20px;
   }

   * + *{
      margin-left: 8px;
   }
`;


export const InfoWrap = styled.div`
   display: flex;
   padding: 12px 0 0 0 ;
`
export const TableLeft = styled.table`
   flex: 1;

   th,td{
      padding: 12px;
      text-align: left;
      border: 1px solid #ccc;
   }

   th{
      background: #ddd;
      font-weight: 500;
   }

`

export const TableRight = styled.table`
   flex: 1;

   th,td{
      text-align: left;
   }

   .current-price{
      font-size: 20px;
      font-weight: 500;
      margin-right: 12px;
   }

   .vsBit{
      color: #bbb;
      margin-top: 4px;
   }

   .text-right{
      text-align: right;
   }
`


export const CalcBox = styled.div`
   background-color: #ddd;
   margin-top: 12px;
   padding: 12px;

   h4{
      font-size: 16px;
   }
`
export const Calc = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;

   input{
      height: 40px;
      padding: 0 12px;
      text-align: right;
      font-size: 16px;
      border: 1px solid #ccc;
      border-left: 0;
   }

   img{
      width: 60px;
      height: 25px;
   }
`

export const Unit = styled.span`
   display: flex;
   align-items: center;
   justify-content: center;

   width: 80px;
   height: 40px;
   border: 1px solid #ccc;
   background-color: #eee;
   font-weight: 500;
   font-size: 16px;
`

export const DescArea = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   margin-top: 12px;

   > button{
      font-size: 16px;
      height: 40px;
      padding: 0 24px 0 12px;
      background: url(/images/arrow-down.svg) no-repeat right / 14px;
   }

   pre{
      padding-top: 24px;
      border-top: 1px solid #ddd;
   }
`