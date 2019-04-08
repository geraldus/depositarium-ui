
import React from 'react'
import { connect } from 'dva'
import { HaveDispatch } from '@/interfaces';
import { UserData } from '@/contexts/AuthContext';
import { HaveUserList, default as View } from './containers/index'

type Props = HaveDispatch

type State = HaveUserList

const defaultProps: Props = Object.freeze({
    dispatch: () => {}
})

const initialState = Object.freeze({
    list: []
})

export class UserListView extends React.Component<Props, State> {
    static readonly defaultProps: Props = defaultProps
    readonly state:State = initialState
    render () {
        console.log('component view')
        return (<>
            <View/>
            <pre>
                STATE: {}
                {JSON.stringify(this.state, null, 2)}
            </pre>
        </>)
    }
}

export default connect()(UserListView)