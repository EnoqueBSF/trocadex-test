import React from 'react';
import { Table, Badge } from 'reactstrap';
import CoinGecko from 'coingecko-api';

class CoinsTable extends React.Component {
    state = {
        exchanges: [],
        tickers: [],
        coinName: ''
    }

    constructor(props) {
        super(props);

        this.CoinGeckoClient = new CoinGecko();
    }

    componentDidMount() {
        this.getExchanges();
        this.fetchTickers('electroneum')
    }

    async getExchanges() {
        await this.CoinGeckoClient.exchanges.all({})
        .then(data => {
            this.setState({
                exchanges: data.data
            });
        })
    }

    async fetchTickers(coinId) {
        await this.CoinGeckoClient.coins.fetchTickers(coinId)
        .then(data => {
            this.setState({
                coinName: data.data.name,
                tickers: data.data.tickers
            });
        })
    }

    render() {
        const { tickers} = this.state;
        return (
            <Table className="align-items-center table-flush" responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Troca</th>
                        <th>Par</th>
                        <th>Preço</th>
                        <th>Spread</th>
                        <th>2% Profundidade</th>
                        <th>-2% Profundidade</th>
                        <th>Volume 24h</th>
                        <th>Volume %</th>
                        <th>Ultima negociação</th>
                        <th>Trust Score</th>
                        <th>Taxa ETN\BTC</th>
                        <th>Taxa retirada BTC</th>
                    </tr>
                </thead>
                <tbody>
                    {tickers.map((ticker, index) => {
                        return (
                            <tr>
                                <th>{index}</th>
                                <th>{ticker.market.name}</th>
                                <th>
                                    <a href={ticker.trade_url}>
                                        {`${ticker.base}/${ticker.target}`}
                                    </a>
                                </th>
                                <th>{`${ticker.last.toFixed(10)} ${ticker.target}`}</th>
                                <th>{Number(ticker.bid_ask_spread_percentage).toFixed(2)}%</th>
                                <th>2% Profundidade</th>
                                <th>-2% Profundidade</th>
                                <th>{ticker.converted_volume.btc} BTC</th>
                                <th>Volume %</th>
                                <th>
                                    {`${String(new Date(ticker.last_traded_at).toLocaleDateString('pt-BR'))} às ${String(new Date(ticker.last_traded_at).toLocaleTimeString('pt-BR'))}`}
                                    </th>
                                <th className="text-center">
                                    <Badge
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: ticker.trust_score
                                    }}>
                                        <i className="fas fa-circle"/>
                                    </Badge>
                                </th>
                                <th>Taxa ETC/BTC</th>
                                <th>Taxa retirada BTC</th>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default CoinsTable;