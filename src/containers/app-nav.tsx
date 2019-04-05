import React, { createRef } from 'react'
import { Menu, Modal } from 'antd'
import { NavLink } from 'react-router-dom'
import { AuthConsumer, UserContext, AuthContext } from '@/contexts/AuthContext'
import { WrappedSigninForm, SigninForm } from '@/containers/form/signin'

import _ from 'lodash'
import { formatMessage } from 'umi-plugin-locale'

import styles from 'antd/dist/antd.css'

interface ClickHandler {
    handleSigninClick?: React.MouseEventHandler
}

const defaultProps = {
    auth: false
}
type Props = Partial<UserContext> & Partial<ClickHandler>

export class AppNav extends React.Component<Props> {
    static readonly defaultProps = defaultProps
    render () {
        console.log(this, window)
        const handleSignin = this.props.handleSigninClick
                ? this.props.handleSigninClick
                : () => {}
        return (
            <Menu
                    defaultSelectedKeys={['1']}
                    mode='horizontal'
                    theme='dark' >
                <Menu.Item style={{float: 'left'}}>
                    <NavLink to='/'>
                        {formatMessage({id: 'pageTitle.home'})}
                    </NavLink>
                </Menu.Item>
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
                            style={{float: 'right'}}>
                        {formatMessage({id: 'general.signout'})}
                    </a>
                }
            </Menu>
        )
    }
}