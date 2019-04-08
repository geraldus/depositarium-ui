import React from 'react'


const defaultProps = Object.freeze({

})

type Props = typeof defaultProps

export default class _ extends React.Component<Props> {
    static readonly defaultProps: Props = defaultProps
    render () {
        return (
            <div>I'm a React Container</div>
        )
    }
}