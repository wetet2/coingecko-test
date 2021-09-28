import React from "react";
import ajax from "../utils/ajax";
import { connect } from "react-redux";
import { addToast } from "../store/toastReducer";

import { Currency, Language } from "../shared/enum";
import Bookmark from "./common/Bookmark";
import ListFilters from "./common/ListFilters";
import utils from "../utils";
import * as S from "./CoinDetailComponent.style";
import * as C from "./common/Common.style";
import { PercentRenderer } from "./common/CellRenderer";

class CoinDetailComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      coinInfos: undefined,
      currentCurrency: Currency.KRW,
      currentLanguage: Language.KO,

      txtCoin: "",
      txtMoney: "",
      exchangeRates: {
        [Currency.KRW]: 1,
        [Currency.USD]: 1100,
      },
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const { currentCurrency } = this.state;
    let coinId = this.props.match.params.coinId;
    if (!coinId || coinId.trim() === "") {
      alert("코인정보를 찾을 수 없습니다");
      return;
    }

    let urlBitcoin = `https://api.coingecko.com/api/v3/coins/bitcoin`;
    let url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    try {
      const resBit = await ajax(urlBitcoin);
      const resCoin = await ajax(url);

      this.setState({
        bitCoinInfos: resBit.data,
        coinInfos: resCoin.data,
        txtCoin: "1",
        txtMoney: utils.comma3Digits(
          resCoin.data.market_data.current_price[currentCurrency]
        ),
      });
    } catch (err) {
      console.error(err);
      alert("정보를 불러오는 도중 오류가 발생하였습니다");
    }
  };

  onChangeFilter = (kind, currency) => {
    const { coinInfos: ci, txtMoney, txtCoin } = this.state;
    ci.market_data.current_price[currency];
    let amount =
      parseFloat(txtCoin.replace(/,/g, "")) *
      ci.market_data.current_price[currency];

    this.setState({
      currentCurrency: currency,
      currentLanguage: currency === Currency.KRW ? Language.KO : Language.EN,
      txtMoney: utils.comma3Digits(parseFloat(amount.toFixed(2))),
    });
  };

  getDescription = () => {
    const { coinInfos: ci } = this.state;
    if (ci.description[Language.KO] && ci.description[Language.KO] !== "")
      return ci.description[Language.KO];
    if (ci.description[Language.EN] && ci.description[Language.EN] !== "")
      return ci.description[Language.EN];
  };

  onClickDesc = (evt) => {
    let descElement = evt.target.nextElementSibling;
    if (descElement && descElement.style.display === "none") {
      descElement.style.display = "block";
    } else {
      descElement.style.display = "none";
    }
  };

  onChangeTxtCoin = (evt) => {
    if (/^\d*(,\d*)*[.]?\d{0,8}$/g.test(evt.target.value)) {
      let coinValue = utils.comma3Digits(evt.target.value);
      let krwValue = this.exchange(coinValue, true);
      this.setState({
        txtCoin: coinValue,
        txtMoney: krwValue,
      });
    }
  };

  onChangetxtMoney = (evt) => {
    if (/^\d*(,\d*)*[.]?\d{0,2}$/g.test(evt.target.value)) {
      let krwValue = utils.comma3Digits(evt.target.value);
      let coinValue = this.exchange(krwValue, false);
      this.setState({
        txtCoin: coinValue,
        txtMoney: krwValue,
      });
    }
  };

  exchange = (value, toKrw) => {
    const { coinInfos: ci, currentCurrency } = this.state;
    if (toKrw) {
      let krwValue =
        ci.market_data.current_price[currentCurrency] *
        parseFloat(value.replace(/,/g, ""));
      return utils.comma3Digits(parseFloat(krwValue.toFixed(2)));
    } else {
      let coinValue =
        parseFloat(value.replace(/,/g, "")) /
        ci.market_data.current_price[currentCurrency];
      return utils.comma3Digits(parseFloat(coinValue.toFixed(8)));
    }
  };

  render() {
    const {
      coinInfos: ci,
      bitCoinInfos: bi,
      currentCurrency,
      currentLanguage,
    } = this.state;
    const { txtCoin, txtMoney } = this.state;
    if (!ci) return "";

    const coinPerBit = parseFloat(
      ci.market_data.current_price[currentCurrency] /
        bi.market_data.current_price[currentCurrency]
    ).toFixed(8);
    const coinDesc = this.getDescription();
    return (
      <>
        <S.Header>
          <Bookmark coinInfo={ci} size={36} />
          <img src={ci.image.small} alt={ci.localization[currentLanguage]} />
          <h3>
            {ci.localization[currentLanguage]} ({ci.symbol.toUpperCase()})
          </h3>
          <ListFilters onChange={this.onChangeFilter} hideView hidePerPage />
        </S.Header>

        <S.InfoWrap>
          <S.TableLeft>
            <tbody>
              <tr>
                <th>시가총액 Rank</th>
                <td>Rank #{ci.market_cap_rank}</td>
              </tr>
              <tr>
                <th>웹사이트</th>
                <td>
                  <a href={ci.links.homepage[0]}>{ci.links.homepage[0]}</a>
                </td>
              </tr>
            </tbody>
          </S.TableLeft>

          <S.TableRight>
            <tbody>
              <tr>
                <td colSpan={2} className="text-right">
                  <C.Currency
                    currency={currentCurrency}
                    className="current-price"
                  >
                    {utils.comma3Digits(
                      ci.market_data.current_price[currentCurrency]
                    )}
                  </C.Currency>
                  {PercentRenderer({
                    value: ci.market_data.price_change_percentage_24h,
                  })}
                  <br />
                  <div className="vsBit">{coinPerBit} BTC</div>
                </td>
              </tr>
              <tr>
                <td className="text-right" style={{ paddingTop: 12 }}>
                  시가총액
                  <br />
                  <C.Currency currency={currentCurrency}>
                    {utils.comma3Digits(
                      ci.market_data.market_cap[currentCurrency]
                    )}
                  </C.Currency>
                </td>
                <td className="text-right" style={{ paddingTop: 12 }}>
                  24시간 거래대금
                  <br />
                  <C.Currency currency={currentCurrency}>
                    {utils.comma3Digits(
                      ci.market_data.total_volume[currentCurrency]
                    )}
                  </C.Currency>
                </td>
              </tr>
            </tbody>
          </S.TableRight>
        </S.InfoWrap>

        <S.CalcBox>
          <h4>가격계산</h4>
          <S.Calc>
            <S.Unit>{ci.symbol.toUpperCase()}</S.Unit>
            <input
              type="text"
              value={txtCoin}
              onChange={this.onChangeTxtCoin}
            />
            <img src="/images/exchange.svg" />
            <S.Unit>{currentCurrency.toUpperCase()}</S.Unit>
            <input
              type="text"
              value={txtMoney}
              onChange={this.onChangetxtMoney}
            />
          </S.Calc>
        </S.CalcBox>

        {coinDesc && (
          <S.DescArea>
            <button onClick={this.onClickDesc}>설명보기</button>
            <pre
              style={{ display: "none" }}
              dangerouslySetInnerHTML={{ __html: this.getDescription() }}
            ></pre>
          </S.DescArea>
        )}
      </>
    );
  }
}

const matDispatchToProps = { addToast };
export default connect(null, matDispatchToProps)(CoinDetailComponent);
