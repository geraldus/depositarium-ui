import React from 'react'
import { Typography } from 'antd'
const { Title, Paragraph } = Typography

import { formatMessage } from 'umi-plugin-locale'

import styles from './index.css'


export default function() {
  return (<>
        <Title>{formatMessage({id: 'pageTitle.home'})}</Title>
        <Paragraph>
            Мы ещё не решили, что будет на главной странице.
        </Paragraph>
    </>)
}
