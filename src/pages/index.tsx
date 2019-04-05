import React from 'react'
import { Typography, Row, Col } from 'antd'
const { Title, Paragraph } = Typography

import { formatMessage } from 'umi-plugin-locale'

import styles from './index.css'

export default () => {
  return (
        <Row type='flex' justify='center'>
            <Col xs={20}>
                <Title>{formatMessage({id: 'pageTitle.home'})}</Title>
                <Paragraph>
                    Мы ещё не решили, что будет на главной странице.
                </Paragraph>
            </Col>
        </Row>
    )
}