import React from 'react'
import ParaInfo from './gen'

import { formatMessage } from 'umi-plugin-locale'
import moment from 'moment'


const defaultProps = Object.freeze({
    value: 0,
    date: 0,
    nextAccountingDate: 0
})
type Props = typeof defaultProps

export default (props: Props = defaultProps) =>
    <ParaInfo value={props.value}>
        {formatMessage({ id: 'general.nextAccountingIn' })}
        {` `}
        {moment(props.date).to(props.nextAccountingDate)}
    </ParaInfo>