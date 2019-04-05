import React from 'react'
import { Typography } from 'antd';


const defaultProps = Object.freeze({
    value: 0,
    currency: '$'
})

type Props = typeof defaultProps

export default (props: Props = defaultProps) =>
    <Typography.Title>
        {props.value}
        <Typography.Text>
            <small>{props.currency}</small>
        </Typography.Text>
    </Typography.Title>