import React from 'react'
import { Menu } from 'antd'
import { NavLink, Link } from 'react-router-dom'
import { UserContext, UserData } from '@/contexts/AuthContext'
import { connect } from 'dva'
import { HaveDispatch } from '@/interfaces/index'
import { WidthProvider } from 'react-grid-layout'


import _ from 'lodash'
import { formatMessage } from 'umi-plugin-locale'

import styles from 'antd/dist/antd.css'

interface ClickHandler {
    handleSigninClick?: React.MouseEventHandler
}

const defaultProps = {
    auth: false,
    accessRights: [],
    dispatch: () => { }
}
type Props = UserContext
    & ClickHandler
    & HaveDispatch
const initialState: UserData = {
    id: 0,
    name: '',
    accessRights: []
}
type State = UserData

export class AppNav extends React.Component<Props, State> {
    static readonly defaultProps = defaultProps
    readonly state = initialState
    handleSignout(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch({ type: 'user/signout' })
    }
    render() {
        const { dispatch } = this.props
        const handleSignin = this.props.handleSigninClick
            ? this.props.handleSigninClick
            : () => { }
        return (
            <Menu
                defaultSelectedKeys={['1']}
                selectedKeys={[window.location.pathname]}
                mode='horizontal'
                theme='dark' >
                <Menu.Item
                    key='/'>
                    <NavLink to='/'>
                        {formatMessage({ id: 'pageTitle.home' })}
                    </NavLink>
                </Menu.Item>
                {this.props.auth && hasRight(this.props.accessRights, 'SelfBalanceView') &&
                    <Menu.Item key='/operator/profile'>
                        <NavLink to='/operator/profile'>
                            {formatMessage({ id: 'pageTitle.operator.profile' })}
                        </NavLink>
                    </Menu.Item>
                }
                {this.props.auth && hasRight(this.props.accessRights, 'ListUsers') &&
                    <Menu.SubMenu title={formatMessage({ id: 'manage.userMenuGroupTitle' })}>
                        <Menu.Item key='/manage/user/'>
                            <NavLink to='/manage/user/'>
                                {formatMessage({ id: 'manage.user.list.page.title' })}
                            </NavLink>
                        </Menu.Item>
                    </Menu.SubMenu>
                }
                <Menu.Item key={`/auth/${this.props.auth ? 'logout' : 'login'}`}>
                    {!this.props.auth
                        ? <Link
                            to='/auth/login'
                            onClick={e => handleSignin(e)}
                            style={{ float: 'right' }}>
                            {formatMessage({ id: 'pageTitle.signin' })}
                        </Link>
                        : <Link
                            to='/auth/logout'
                            onClick={(e) => this.handleSignout(e)}>
                            {formatMessage({ id: 'general.signout' })}
                        </Link>
                    }
                </Menu.Item>
            </Menu>
        )
    }
}

const mapStateToProps = (state: State) => {
    return (state.user)
}

export default connect(mapStateToProps)(AppNav)

const hasRights = (accessRights: string[], accessTypes: string[]): boolean =>
    _.intersection(accessRights, accessTypes).length > 0

const hasRight = (accessRights: string[], accessType: string): boolean =>
    hasRights(accessRights, [accessType])
