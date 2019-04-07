import React from 'react'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import { UserContext, UserData } from '@/contexts/AuthContext'
import { connect } from 'dva'
import { HaveDispatch } from '@/interfaces/index'

import _ from 'lodash'
import { formatMessage } from 'umi-plugin-locale'

import styles from 'antd/dist/antd.css'

interface ClickHandler {
    handleSigninClick?: React.MouseEventHandler
}

const defaultProps = {
    auth: false,
    accessRights: [],
    dispatch: () => {}
}
type Props = Partial<UserContext>
    & Partial<ClickHandler>
    & Partial<HaveDispatch>
const initialState: UserData = {
    id:0 ,
    name: '',
    accessRights: []
}
type State = UserData

export class AppNav extends React.Component<Props, State> {
    static readonly defaultProps = defaultProps
    readonly state = initialState
    handleSignout(e:React.MouseEvent<HTMLElement>) {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch({ type: 'user/signout' })
    }
    render () {
        const { dispatch } = this.props
        const handleSignin = this.props.handleSigninClick
                ? this.props.handleSigninClick
                : () => {}
        return (
            <Menu
                    defaultSelectedKeys={['1']}
                    selectedKeys={[window.location.pathname]}
                    mode='horizontal'
                    theme='dark' >
                <Menu.Item style={{float: 'left'}} key='/'>
                    <NavLink to='/'>
                        {formatMessage({id: 'pageTitle.home'})}
                    </NavLink>
                </Menu.Item>
                {this.props.auth && hasAccess(this.props.accessRights, 'SelfBalanceView') &&
                    <Menu.Item style={{float: 'left'}} key='/operator/profile'>
                        <NavLink to='/operator/profile'>
                            {formatMessage({id: 'pageTitle.operator.profile'})}
                        </NavLink>
                    </Menu.Item>
                }
                {!this.props.auth &&
                    <a
                            href='/auth/login'
                            onClick={e => handleSignin(e)}
                            style={{float: 'right'}}>
                        {formatMessage({id: 'pageTitle.signin'})}
                    </a>
                }
                {this.props.auth &&
                    <a
                            href='/auth/logout'
                            style={{float: 'right'}}
                            onClick={(e) => this.handleSignout(e) }>
                        {formatMessage({id: 'general.signout'})}
                    </a>
                }
            </Menu>
        )
    }
}

const mapStateToProps = (state: State) => {
    return (state.user)
}

const mapDispatchToProps = (dispatch: HaveDispatch) => {
    return ({
        dispatch: dispatch
    })
}

export default connect(mapStateToProps)(AppNav)

const hasAccess = (accessRights, accessType: string): boolean => {
    return accessRights.indexOf(accessType) !== -1
    return false
}