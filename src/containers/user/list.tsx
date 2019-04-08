import React from 'react'
import { UserData } from '@/contexts/AuthContext';


export interface HaveUserList {
    list: UserData[]
}

type Props = HaveUserList

const defaultProps: Props = Object.freeze({
    list: []
})

export default class UserListView extends React.Component<Props> {
    static readonly defaultProps: Props = defaultProps
    render () {
        return (
            <div>
                <div>I'm a React Container</div>
                <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </div>
        )
    }
}