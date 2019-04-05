import React from 'react'
import { Typography } from 'antd'

const { Title, Text } = Typography


const defaultProps = Object.freeze({
    value: 0
})
type Props = typeof defaultProps

export default class ParamineInfo extends React.Component<Props> {
    static readonly defaultProps = defaultProps
    render () {
        const { props } = this
        return (<>
            <Title level={4}>+{props.value}</Title>
            <Text>
                {props.children}
            </Text>
        </>)
    }
}