
import React from 'react';
import { Row, Col, Typography, Icon } from 'antd'
import 'whatwg-fetch'
import _ from 'lodash'

import { BalanceInfo } from '@/containers/operator/profile/balance-info'

import styles from './profile.css'
import { formatMessage } from 'umi-plugin-locale';



const { Title, Text } = Typography

const monthlyCompoundInterest = 1.25
// const dailyCompoundInterest = Math.pow(monthlyCompoundInterest, 1/30)
const dayMs = 24 * 60 * 60 * 1000
const monthMs = 30 * dayMs
const msCompoundInterest = Math.pow(monthlyCompoundInterest, 1 / monthMs)

const initialState = {
    balance: {
        rur: {
            value: 0,
            date: (new Date()).getTime(),
            para: 0
        },
        pzm: {
            value: 0,
            date: (new Date()).getTime(),
            para: 0
        }
    },
    requestAnimationFrameH: -1,
    test: ''
}

const defaultProps = {
    api: {
        profile: '/api/operator/profile',
        balance: '/api/operator/balance'
    },
    labels: {
        deposit: 'Пополнение',
        withdrawal: 'Вывод',
        startDate: 'Дата отсчёта'
    }
}

type State = Readonly<typeof initialState>
type Props = typeof defaultProps


class Profile extends React.Component<Props, State> {
    static defaultProps = defaultProps
    readonly state: State = initialState
    paramine (currentTime: number) {
        const h = requestAnimationFrame(e => this.paramine(e))
        this.setState(s => {
            const { balance: { pzm, rur } } = s
            const v = s.balance.pzm.value
            const diffMsT = (new Date()).getTime() - s.balance.pzm.date
            return _.merge({}, s, {
                balance: {
                    pzm: {
                        para: v * Math.pow(monthlyCompoundInterest, diffMsT / monthMs) - v
                    }
                },
                requestAnimationFrameH: h,
                test: `${diffMsT / monthMs}; ${s.balance.pzm.value}; ${s.balance.pzm.value * Math.pow(monthlyCompoundInterest, 1/ (diffMsT / monthMs))}`
            })
        })
    }
    componentDidMount(){
        fetch(this.props.api.profile)
            .then(r => r.json()).then(j => {
                const h = requestAnimationFrame(e => this.paramine(e))
                this.setState({
                    ... j,
                    requestAnimationFrameH: h
                })
            })
    }
    componentWillUnmount () {
        const handle = this.state.requestAnimationFrameH
        if (handle !== -1) {
            cancelAnimationFrame(handle)
        }
    }
    render () {
        const { props, state } = this
        const { balance } = state
        const L = props.labels
        let x = new Date()
        x.setTime(balance.pzm.date)
        return (
            <>
                <Row>
                    <Col>
                        <BalanceInfo value={balance.pzm.value} currency="PZM"/>
                    </Col>
                    <Col>
                        <Title level={3}>
                            {`+`}
                            {balance.pzm.para}
                        </Title>
                        <Text>
                            {formatMessage({ id: 'general.startDate' })}
                            {` `}
                            {balance.pzm.date.toLocaleString()}
                        </Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BalanceInfo value={balance.rur.value} currency="₽"/>
                    </Col>
                </Row>
            <pre style={{textAlign: 'left'}}>
                {JSON.stringify(this.state, null, 4)}
            </pre>
            </>
        )
    }
}

export default Profile