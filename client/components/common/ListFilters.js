import React from 'react';
import PropTypes from 'prop-types';
import * as S from './ListFilters.style';
import { Filter, Currency } from '../../shared/enum';

const viewOptions = [
   { text: '전체보기', value: 1 },
   { text: '북마크 보기', value: 2 },
]

const currencyOptions = [
   { text: 'KRW 보기', value: 'krw' },
   { text: 'USD 보기', value: 'usd' },
]

const perPageOptions = [
   { text: '10개 보기', value: 10 },
   { text: '30개 보기', value: 30 },
   { text: '50개 보기', value: 50 },
]

class ListFilters extends React.Component {

   static propTypes = {
      onChange: PropTypes.func.isRequired,
      hideView: PropTypes.bool,
      hideCurrency: PropTypes.bool,
      hidePerPage: PropTypes.bool,
   }

   render() {
      const { hideView, hideCurrency, hidePerPage } = this.props;
      return (
         <S.Filters>
            {
               !hideView &&
               <S.Select defaultValue={Filter.View.ALL} onChange={(evt) => this.props.onChange(Filter.Kind.VIEW, evt.target.value)}>
                  {
                     viewOptions.map((o, i) => (
                        <option key={i} value={o.value}>{o.text}</option>
                     ))
                  }
               </S.Select>
            }
            {
               !hideCurrency &&
               <S.Select defaultValue={Currency.KRW} onChange={(evt) => this.props.onChange(Filter.Kind.CURRENCY, evt.target.value)}>
                  {
                     currencyOptions.map((o, i) => (
                        <option key={i} value={o.value}>{o.text}</option>
                     ))
                  }
               </S.Select>
            }
            {
               !hidePerPage &&
               <S.Select defaultValue={Filter.DEFAULT_PAGING_SIZE} onChange={(evt) => this.props.onChange(Filter.Kind.PER_PAGE, evt.target.value)}>
                  {
                     perPageOptions.map((o, i) => (
                        <option key={i} value={o.value}>{o.text}</option>
                     ))
                  }
               </S.Select>
            }
         </S.Filters>
      )
   }
}
export default ListFilters;
