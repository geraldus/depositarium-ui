import React, { Children } from 'react'

import { Row, Col, Typography, Icon } from 'antd'

import { formatMessage } from 'umi-plugin-locale'


const { Title, Text } = Typography


const defaultProps = Object.freeze({
    value: 0,
    currency: ''
})

type Props = typeof defaultProps
// type Props = {
//     onDepositRequset(e: React.MouseEvent<HTMLElement>): void
//     onWithdrawalRequset(e: React.MouseEvent<HTMLElement>): void
// } & Partial<typeof defaultProps>

export class BalanceInfo extends React.Component<Props> {
    static readonly defaultProps = defaultProps
    render () {
        const { value, currency } = this.props
        return (
            <Title>
                <Row type="flex" justify="space-between">
                    <Col>
                        {value}
                        <Text><small>{currency}</small></Text>
                    </Col>
                    <Col>
                        <Icon type="download" title={formatMessage({ id: 'general.deposit' })}/>
                        <Icon type="upload" title={formatMessage({ id: 'general.withdrawal' })} />
                    </Col>
                </Row>
            </Title>
        )
} }



