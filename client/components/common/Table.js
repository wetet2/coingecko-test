import React from "react";
import PropTypes from "prop-types";
import * as S from "./Table.style";

class Table extends React.Component {
  static propTypes = {
    colDef: PropTypes.arrayOf(
      PropTypes.shape({
        header: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
        cellRenderer: PropTypes.func,
        cellClass: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        cellStyle: PropTypes.object,
        headerStyle: PropTypes.object,
      })
    ).isRequired,
    rowData: PropTypes.arrayOf(PropTypes.object),
  };

  constructor() {
    super();
    this.refTable = React.createRef();
  }

  tdClassName = (row, col) => {
    let classes = [];
    if (col.cellClass) {
      if (col.cellClass.constructor.name === "Function") {
        classes.push(col.cellClass({ row, col, value: row[col.field] }));
      } else if (col.cellClass.constructor.name === "String") {
        classes.push(col.cellClass);
      }
    }
    if (col.onClick) {
      classes.push("clickable");
    }
    return classes.join(" ");
  };

  render() {
    const { tabs, colDef, rowData = [], comp, ...restProps } = this.props;
    return (
      <S.Table ref={this.refTable} {...restProps}>
        <colgroup>
          {colDef.map((col, i) => (
            <col key={i} width={col.width}></col>
          ))}
        </colgroup>
        <thead>
          <tr>
            {colDef.map((col, i) => (
              <th key={i} style={col.headerStyle ? col.headerStyle : undefined}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowData.map((row, i) => (
            <tr key={i}>
              {colDef.map((col, j) => {
                if (col.compo) {
                  return col.compo({ row, col, value: row[col.field] });
                } else {
                  return (
                    <td
                      key={j}
                      className={this.tdClassName(row, col)}
                      onClick={() =>
                        col.onClick
                          ? col.onClick({ row, col, value: row[col.field] })
                          : null
                      }
                      style={col.cellStyle ? col.cellStyle : undefined}
                    >
                      {col.cellRenderer
                        ? col.cellRenderer({ row, col, value: row[col.field] })
                        : row[col.field]}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </S.Table>
    );
  }
}
export default Table;
