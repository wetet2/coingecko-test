import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addToast } from "../store/toastReducer";

import ajax from "../utils/ajax";
import { Filter, Keyword, Currency } from "../shared/enum";
import ls from "../shared/localStorage";
import Table from "./common/Table";
import ListFilters from "./common/ListFilters";
import Bookmark from "./common/Bookmark";
import Sparkline from "./common/Sparkline";
import SparklineSvg from "./common/SparklineSvg";
import { PercentRenderer, AmountRenderer } from "./common/CellRenderer";
import * as C from "./common/Common.style";

const customCellClass = ({ row, col, value }) => {
  let classes = [];
  if (value?.constructor.name === "Number") {
    classes.push("text-right");
  }
  return classes.join(" ");
};

class MarketsComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      colDef: [
        {
          header: "",
          field: "",
          width: "50px",
          cellRenderer: this.cellRendererBookmark,
          cellClass: "text-center",
        },
        {
          header: "자산",
          field: "name",
          width: "auto",
          onClick: this.onClickCell,
          cellStyle: { fontWeight: 500 },
        },
        { header: "", field: "symbol", width: "70px" },
        {
          header: "Price",
          field: "current_price",
          cellRenderer: this.customAmountRenderer,
          cellClass: "text-right",
          cellStyle: { fontWeight: 500 },
          headerStyle: { textAlign: "right" },
        },
        {
          header: "1H",
          field: "price_change_percentage_1h_in_currency",
          width: "80px",
          cellRenderer: PercentRenderer,
          cellClass: customCellClass,
          cellStyle: { fontWeight: 500 },
          headerStyle: { textAlign: "right" },
        },
        {
          header: "24H",
          field: "price_change_percentage_24h_in_currency",
          width: "80px",
          cellRenderer: PercentRenderer,
          cellClass: customCellClass,
          cellStyle: { fontWeight: 500 },
          headerStyle: { textAlign: "right" },
        },
        {
          header: "7D",
          field: "price_change_percentage_7d_in_currency",
          width: "80px",
          cellRenderer: PercentRenderer,
          cellClass: customCellClass,
          cellStyle: { fontWeight: 500 },
          headerStyle: { textAlign: "right" },
        },
        {
          header: "24H Volume",
          field: "total_volume",
          cellRenderer: this.customAmountRenderer,
          cellClass: "text-right",
          cellStyle: { fontWeight: 500 },
          headerStyle: { textAlign: "right" },
        },
        // {
        //   header: "Line in 7D",
        //   field: "sparkline_in_7d",
        //   width: "200px",
        //   cellRenderer: this.customSparkline,
        //   cellStyle: { padding: 0, lineHeight: 0 },
        // },
        {
          header: "Line in 7D",
          field: "sparkline_in_7d",
          width: "200px",
          cellRenderer: this.customSparkline2,
          cellStyle: { padding: 0, lineHeight: 0, textAlign: "center" },
        },
      ],
    };
  }

  currentPage = 1;
  currentPerPage = Filter.DEFAULT_PAGING_SIZE;
  currentCurrency = Currency.KRW;

  componentDidMount() {
    this.loadData();
  }

  customSparkline = ({ row, value }) => {
    return (
      <Sparkline
        data={value.price}
        percentage7d={row.price_change_percentage_7d_in_currency}
      ></Sparkline>
    );
  };
  customSparkline2 = ({ row, value }) => {
    return (
      <SparklineSvg
        id={row.id}
        data={value.price}
        percentage7d={row.price_change_percentage_7d_in_currency}
      ></SparklineSvg>
    );
  };
  customAmountRenderer = (params) => {
    return (
      <C.Currency currency={this.currentCurrency}>
        {AmountRenderer(params)}
      </C.Currency>
    );
  };

  cellRendererBookmark = ({ row }) => {
    return <Bookmark coinInfo={row} />;
  };

  onClickCell = ({ row }) => {
    this.props.history.push(`/coins/${row["id"]}`);
  };

  buildURL = (params = {}) => {
    return (
      `https://api.coingecko.com/api/v3/coins/markets?` +
      [
        `vs_currency=${params.currency}`,
        // `ids=bitcoin`,
        `order=market_cap_desc`,
        `per_page=${params.perPage}`,
        // `per_page=${1}`,
        `page=${params.page}`,
        `sparkline=true`,
        `price_change_percentage=1h%2C24h%2C7d`,
      ].join("&")
    );
  };

  loadData = async (isMore) => {
    let { rowData } = this.state;
    if (!isMore) this.currentPage = 1;

    let url = this.buildURL({
      currency: this.currentCurrency,
      perPage: this.currentPerPage,
      page: this.currentPage++,
    });

    const response = await ajax(url);
    if (isMore) {
      rowData = rowData.concat(response.data);
    } else {
      rowData = response.data;
    }
    this.setState({
      rowData,
    });
  };

  onClickMore = () => {
    this.loadData(true);
  };

  onChangeFilter = (filterName, value) => {
    switch (filterName) {
      case Filter.Kind.VIEW:
        this.setState({
          viewType: value,
        });
        break;
      case Filter.Kind.CURRENCY:
        this.currentCurrency = value;
        this.loadData();
        break;
      case Filter.Kind.PER_PAGE:
        this.currentPerPage = value;
        this.loadData();
        break;
    }
  };

  render() {
    let { colDef, rowData, viewType } = this.state;
    if (viewType == Filter.View.BOOKMARK) {
      let bookmarks = ls.getItem(Keyword.BOOKMARK) || [];
      rowData = rowData.filter((row) => bookmarks.includes(row.id));
    }
    return (
      <>
        <ListFilters onChange={this.onChangeFilter} />
        <Table
          colDef={colDef}
          rowData={rowData}
          style={{ marginTop: 12 }}
        ></Table>
        <C.More onClick={this.onClickMore}>더보기</C.More>
      </>
    );
  }
}

const matDispatchToProps = { addToast };
export default connect(null, matDispatchToProps)(withRouter(MarketsComponent));
