import React from 'react'
import { Typography } from 'antd'

import { formatMessage } from 'umi-plugin-locale'

const { Title } = Typography

const defaultProps = {
}

type Props = typeof defaultProps

export default (p: Props = defaultProps) =>
    <>
        <Title level={2}>
            {formatMessage({id: 'general.history'})}
        </Title>
    </>
