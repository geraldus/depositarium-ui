
import React from 'react'
import { connect } from 'dva'
import { HaveDispatch } from '@/interfaces';
import { UserData } from '@/contexts/AuthContext';
import { HaveUserList, default as View } from '@/containers/user/list'

type Props = HaveUserList & HaveDispatch

type State = HaveUserList

const defaultProps: Props = Object.freeze({
    dispatch: () => { },
    list: []
})

const initialState = Object.freeze({
    list: []
})

export class UserListView extends React.Component<Props, State> {
    static readonly defaultProps: Props = defaultProps
    readonly state: State = initialState
    componentDidMount() {
        this.props.dispatch({ type: 'user.manage/list' })
    }
    render() {
        return (<>
            <View list={this.props.list}/>
        </>)
    }
}

const mapStateToProps = (state, prevProps) => {
    console.log(state, prevProps)
    return ({
        list: state['user.manage'].list
    })
}

export default connect(mapStateToProps)(UserListView)