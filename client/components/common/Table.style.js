import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;

  th,
  td {
    padding: 12px;
  }

  thead {
    th {
      background-color: #f4f4f4;
      color: #999;
      font-weight: 500;
      text-align: left;
    }
  }
  tbody {
    td {
      border-bottom: 1px solid #ddd;

      &.text-right {
        text-align: right;
      }

      &.text-center {
        text-align: center;
      }

      &.clickable {
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
