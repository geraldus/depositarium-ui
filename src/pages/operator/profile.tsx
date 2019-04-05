
import React from 'react';
import { Row, Col, Typography, Icon } from 'antd'
import { BalanceInfo } from '@/containers/operator/profile/balance-info'
import History from '@/containers/operator/profile/balance/history'
import { PzmParamineInfo, RurParamineInfo } from '@/containers/operator/profile/balance/paramining'

import 'whatwg-fetch'
import _ from 'lodash'
import { formatMessage } from 'umi-plugin-locale'
import moment from 'moment'

import styles from './profile.css'



const montlySimpleInterest = 0.21
const monthlyCompoundInterest = 1.25
const dayMs = 24 * 60 * 60 * 1000
const monthMs = 30 * dayMs

const initialState = {
    balance: {
        rur: {
            value: 0,
            date: moment().valueOf(),
            para: 0,
            nextDate: 0
        },
        pzm: {
            value: 0,
            date: moment().valueOf(),
            para: 0
        }
    },
    requestAnimationFrameH: -1,
    test: ''
}


type State = Readonly<typeof initialState>


class Profile extends React.Component<State> {
    readonly state = initialState
    paramine (currentTime: number) {
        const h = requestAnimationFrame(e => this.paramine(e))
        this.setState((s: State) => {
            const { balance: { pzm, rur } } = s
            const vPzm = pzm.value
            const vRur = rur.value
            const now = moment()
            const pzmDeltaT = now.valueOf() - pzm.date
            const rurDeltaT = now.valueOf() - rur.date
            const rurDays = Math.floor(rurDeltaT / (10 * dayMs))
            const next = moment().add(rurDays + 1, 'days')
            return _.merge({}, s, {
                balance: {
                    pzm: {
                        para: (vPzm * Math.pow(
                                monthlyCompoundInterest,
                                pzmDeltaT / monthMs
                            ) - vPzm).toFixed(12)
                    },
                    rur: {
                        para: vRur * montlySimpleInterest / 3 * rurDays,
                        nextDate: next.valueOf()
                    }
                },
                requestAnimationFrameH: h,
            })
        })
    }
    componentDidMount(){
        setTimeout(() => {
            fetch('/api/operator/profile')
                .then(r => r.json())
                .then(j => {
                    const h = requestAnimationFrame(e => this.paramine(e))
                    this.setState(s => _.merge({}, s, j, {
                        requestAnimationFrameH: h
                    }))
                })
                .catch(e => { console.error('Balance request error', e) })
            }, 0)
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
        let x = new Date()
        x.setTime(balance.pzm.date)
        return (
            <Row type='flex' justify='center'>
                <Col xs={22} md={11}>
                <Row style={{marginTop: 24}} gutter={24}>
                    <Col>
                        <BalanceInfo value={balance.pzm.value} currency="PZM"/>
                    </Col>
                    <Col>
                        <PzmParamineInfo
                            value={balance.pzm.para}
                            date={balance.pzm.date} />
                    </Col>
                </Row>
                </Col>
                <Col xs={22} md={11}>
                <Row style={{ marginTop: 24}}>
                    <Col>
                        <BalanceInfo value={balance.rur.value} currency="₽"/>
                    </Col>
                    <Col>
                        <RurParamineInfo
                            value={balance.rur.para}
                            date={balance.rur.date}
                            nextAccountingDate={balance.rur.nextDate}/>
                    </Col>
                </Row>
                <Row style={{marginTop: 40}}>
                    <Col>
                        <History />
                    </Col>
                </Row>
            </Col>
        </Row>
        )
    }
}

export default Profile