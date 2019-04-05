import React from 'react'
import { Row, Col, Radio } from 'antd'

import BalanceTitle from './balance/title'

import { formatMessage } from 'umi-plugin-locale'




const defaultProps = Object.freeze({
    value: 0,
    currency: '',
    state: { visible: false }
})

const initialState = Object.freeze({
    visible: false
})

type Props = typeof defaultProps
type State = typeof initialState

export class BalanceInfo extends React.Component<Props, State> {
    static readonly defaultProps = defaultProps
    readonly state = initialState

    showDrawer = () => {
      this.setState({
        visible: true,
      })
    }

    onClose = () => {
      this.setState({
        visible: false,
      })
    }

    render () {
        const { value, currency } = this.props
        return (
            <>
            <Row type='flex' justify='space-between' align='middle'>
                <Col xs={24} md={14}>
                    <BalanceTitle value={value} currency={currency}/>
                </Col>
                <Col md={10}>
                    <Radio.Group value={'small'}>
                        <Radio.Button value="deposit" onClick={this.showDrawer}>{formatMessage({id: 'general.depositIn'})}</Radio.Button>
                        <Radio.Button value="withdrawal" onClick={this.showDrawer}>{formatMessage({id: 'general.withdrawal'})}</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
        </>
    )
} }
