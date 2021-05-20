import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToast } from '../reducer/toastReducer';

import { Currency, Keyword } from '../shared/enum';
import utils from '../utils';
import Table from './common/Table';
import ajax from '../utils/ajax';
import ls from '../shared/localStorage';
import Bookmark from './common/Bookmark';
import { PercentRenderer, AmountRenderer } from './common/CellRenderer';
import * as C from './common/Common.style';

const customCellClass = ({ row, col, value }) => {
   let classes = [];
   if (value?.constructor.name === 'Number') {
      classes.push('text-right');
   }
   return classes.join(' ');
}

class BookmarksComponent extends React.Component {

   constructor() {
      super();
      this.state = {
         colDef: [
            { header: '', field: '', width: '50px', cellRenderer: this.cellRendererBookmark, cellClass: 'text-center', cellStyle: { padding: 0 } },
            { header: '자산', field: 'name', width: 'auto', onClick: this.onClickCell, cellStyle: { fontWeight: 500 } },
            { header: '', field: 'symbol', width: '70px' },
            { header: 'Price', field: 'current_price', cellRenderer: this.customAmountRenderer, cellClass: 'text-right', cellStyle: { fontWeight: 500 }, headerStyle: { textAlign: 'right' } },
            { header: '1H', field: 'price_change_percentage_1h_in_currency', width: '80px', cellRenderer: PercentRenderer, cellClass: customCellClass, cellStyle: { fontWeight: 500 }, headerStyle: { textAlign: 'right' } },
            { header: '24H', field: 'price_change_percentage_24h_in_currency', width: '80px', cellRenderer: PercentRenderer, cellClass: customCellClass, cellStyle: { fontWeight: 500 }, headerStyle: { textAlign: 'right' } },
            { header: '7D', field: 'price_change_percentage_7d_in_currency', width: '80px', cellRenderer: PercentRenderer, cellClass: customCellClass, cellStyle: { fontWeight: 500 }, headerStyle: { textAlign: 'right' } },
            { header: '24H Volume', field: 'total_volume', cellRenderer: this.customAmountRenderer, cellClass: 'text-right', cellStyle: { fontWeight: 500 }, headerStyle: { textAlign: 'right' } },
         ],
         bookmarks: ls.getItem(Keyword.BOOKMARK) || [],
      }
   }

   componentDidMount() {
      this.loadData();
   }

   cellRendererBookmark = ({ row }) => {
      return (
         <Bookmark coinInfo={row} onChange={this.onChangeBookmark} />
      )
   }
   onChangeBookmark = (ci, isOn) => {
      if (!isOn) {
         let { rowData } = this.state;
         utils.remove(rowData, e => e.id === ci.id)
         this.setState({ rowData })
      }
   }

   onClickCell = ({ row }) => {
      this.props.history.push(`/coins/${row['id']}`);
   }

   customAmountRenderer = (params) => {
      return <C.Currency currency={Currency.KRW}>{AmountRenderer(params)}</C.Currency>
   }

   buildURL = ({ bookmarks }) => {
      return [
         `https://api.coingecko.com/api/v3/coins/markets?`,
         `vs_currency=krw&`,
         `ids=${bookmarks.join(',')}&`,
         `order=market_cap_desc&`,
         `per_page=${bookmarks.length}&`,
         `page=1&`,
         `sparkline=false&`,
         `price_change_percentage=1h%2C24h%2C7d`].join('');
   }

   loadData = async () => {
      let { rowData } = this.state;
      this.currentPage = 1;
      let url = this.buildURL({
         bookmarks: ls.getItem(Keyword.BOOKMARK) || [],
      });
      const response = await ajax(url);

      rowData = response.data;
      this.setState({
         rowData
      })
   }

   render() {
      const { colDef, rowData } = this.state;
      return (
         <Table colDef={colDef} rowData={rowData}></Table>
      )
   }
}

const matDispatchToProps = { addToast };
export default connect(
   null,
   matDispatchToProps
)(withRouter(BookmarksComponent));

// export default withRouter(BookmarksComponent);
