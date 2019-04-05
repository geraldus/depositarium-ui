import React, { createRef } from 'react'
import { Menu, Modal } from 'antd'
import { NavLink } from 'react-router-dom'
import { AuthConsumer, UserContext, AuthContext } from '@/contexts/AuthContext'
import { WrappedSigninForm, SigninForm } from '@/containers/form/signin'

import _ from 'lodash'
import { formatMessage } from 'umi-plugin-locale'

import styles from 'antd/dist/antd.css'


/** FIXME: Handle Auth somewhere else */

const initialState = {
    signinForm: false
}

type State = typeof initialState

export class AppNav extends React.Component<{}, State> {
    static contextType = AuthContext
    readonly state = initialState
    private signinFormRef = createRef<SigninForm>()
    saveSigninFormRef (formRef: SigninForm) {
        this.signinFormRef = formRef
    }
    signinFormShow (e: React.MouseEvent<HTMLElement>) {
        e.preventDefault()
        this.setState({ signinForm: true })
    }
    handleSigninFormClose () {
        this.setState({ signinForm: false })
    }
    handleAuthResult () {
        const form = this.signinFormRef.props.form
        // TODO: Provide type for 'r'
        switch (r.status) {
            case 'fail':
                form.setFields({ password: {
                    value: form.getFieldValue('password'),
                    errors: [new Error(r.message)]
                }})
            break
            case 'ok': {

            }
        }

    }
    signin (e: React.FormEvent) {
        const form = this.signinFormRef.props.form
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                const formData = new FormData()
                formData.append('username', values['username'])
                formData.append('password', values['password'])
                fetch('/auth/page/prizm-json-plugin/login?_accept=application/json', {
                    method: 'POST',
                    body: formData
                })
                    .then(r => r.json())
                    .then(j => {
                        this.handleAuthResult(j)
                    })
                    .catch(e => console.log(e))
            }
        })
    }
    appNav () {
        return ((c: UserContext) => {
            console.log('test context', c, this)
            return (<>
                <Menu
                        defaultSelectedKeys={['1']}
                        mode='horizontal'
                        theme='dark' >
                    <Menu.Item style={{float: 'left'}}>
                        <NavLink to='/'>
                            {formatMessage({id: 'pageTitle.home'})}
                        </NavLink>
                    </Menu.Item>
                    {!c.auth &&
                        <a
                                href='/auth/login'
                                onClick={e => this.signinFormShow(e)}
                                style={{float: 'right'}}>
                            {formatMessage({id: 'pageTitle.signin'})}
                        </a>
                    }
                </Menu>
                <Modal
                        title={formatMessage({id: 'pageTitle.signin'})}
                        visible={this.state.signinForm}
                        centered
                        destroyOnClose={true}
                        okText={formatMessage({id: 'general.signin'})}
                        cancelText={formatMessage({id: 'general.cancel'})}
                        onOk={e => this.signin(e)}
                        onCancel={e => this.handleSigninFormClose()}
                    >
                    <WrappedSigninForm
                        wrappedComponentRef={(ref: SigninForm) => this.saveSigninFormRef(ref)}
                        />
                </Modal>
            </>)
        })
    }
    render () {
        console.log(this, window)
        return (<AuthConsumer>
            {this.appNav()}
        </AuthConsumer>)
    }
}