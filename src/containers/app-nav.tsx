import React from 'react'
import { Menu, message } from 'antd'
import { NavLink, Link } from 'react-router-dom'
import { UserContext, UserData } from '@/contexts/AuthContext'
import { connect } from 'dva'
import { HaveDispatch } from '@/interfaces/index'
import _ from 'lodash'
import { formatMessage } from 'umi-plugin-locale'
import styles from 'antd/dist/antd.css'
import user from '@/pages/manage/user'
import { mkIdent } from '@/utils/user'

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
    & Partial<{
        firstName: string,
        lastName: string,
        patronymic: string
    }>
const initialState: UserData = {
    id: 0,
    ident: '',
    accessRights: []
}
type State = UserData


export class AppNav extends React.Component<Props, State> {
    static readonly defaultProps = defaultProps
    readonly state = initialState
    handleSignout(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault()
        const ident = mkIdent(this.props)
        message.info([
            formatMessage({ id: 'feedback.auth.signed-out.goodbye-text' }),
            ` ${ident}`
        ].join(' '))
        const { dispatch } = this.props
        dispatch({ type: 'user/signout' })
    }
    render() {
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

                {!this.props.auth
                    ?
                    <Menu.Item key={`/auth/${this.props.auth ? 'logout' : 'login'}`}>
                        <Link
                            to='/auth/login'
                            onClick={e => handleSignin(e)}
                            style={{ float: 'right' }}>
                            {formatMessage({ id: 'pageTitle.signin' })}
                        </Link>
                    </Menu.Item>
                    :
                    <Menu.SubMenu title={<strong>{this.props.ident || mkIdent(this.props)}</strong>}>
                        <Menu.Item>
                            <Link
                                to='/auth/logout'
                                onClick={(e) => this.handleSignout(e)}>
                                {formatMessage({ id: 'general.signout' })}
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                }

            </Menu>
        )
    }
}

const mapStateToProps = (state: State, props: Props) => {
    if (state.user.auth && state.user.auth !== props.auth) {
        message.success(mkIdent(state))
    }
    return (state.user)
}

export default connect(mapStateToProps)(AppNav)

const hasRights = (accessRights: string[], accessTypes: string[]): boolean =>
    _.intersection(accessRights, accessTypes).length > 0

const hasRight = (accessRights: string[], accessType: string): boolean =>
    hasRights(accessRights, [accessType])
