import React from 'react'
import ParaInfo from './gen'

import { localizeStartDate } from '@/utils'
import { formatMessage } from 'umi-plugin-locale'


const defaultProps = Object.freeze({
    value: 0,
    date: 0
})
type Props = typeof defaultProps

export default (props: Props = defaultProps) =>
    <ParaInfo value={props.value}>
        {formatMessage({ id: 'general.startDate' })}
        {` `}
        {localizeStartDate(props.date, 'Do MMMM YYYY')}
    </ParaInfo>