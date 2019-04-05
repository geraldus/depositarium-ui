import React, { createRef, ComponentPropsWithRef, ComponentProps } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Modal, Layout } from 'antd'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { AppNav } from '@/containers/app-nav';
import { AuthProvider, UserContext } from '@/contexts/AuthContext'
import { AuthConsumer, AuthContext } from '@/contexts/AuthContext'
import { WrappedSigninForm, SigninForm } from '@/containers/form/signin'

import withRouter from 'umi/withRouter';
import _ from 'lodash'
import { formatMessage } from 'umi-plugin-locale'

import styles from 'antd/dist/antd.css'

const { Header, Content, Footer } = Layout


type Props = RouteComponentProps & ComponentPropsWithRef<any>

type FormRef = React.RefObject<SigninForm> & React.ComponentProps

const initialState = {
    signinForm: false
}
type State = typeof initialState

class BasicLayout extends React.Component<Props, State> {
    static contextType = AuthContext
    readonly state = initialState
    private signinFormRef = createRef<FormRef>()
    saveSigninFormRef (formRef: FormRef) {
        this.signinFormRef = formRef
    }
    signinFormShow (e: React.MouseEvent<HTMLElement>) {
        e.preventDefault()
        this.setState({ signinForm: true })
    }
    handleSigninFormClose () {
        this.setState({ signinForm: false })
    }
    handleAuthResult (r, login: (e: UserContext) => void) {
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
                login(r.data)
                this.handleSigninFormClose()
            }
        }
    }
    signin (e: React.FormEvent, login: (e: UserContext) => void) {
        const form = this.signinFormRef.props.form
        form.validateFields((err, values) => {
            if (!err) {
                const formData = new FormData()
                formData.append('username', values['username'])
                formData.append('password', values['password'])
                fetch('/auth/page/prizm-json-plugin/login?_accept=application/json', {
                    method: 'POST',
                    body: formData
                })
                    .then(r => r.json())
                    .then(j => {
                        this.handleAuthResult(j, login)
                    })
                    .catch(e => console.log(e))
            }
        })
    }
    render () {
        const { props } = this
        return (
            <Layout>
                <AuthConsumer>
                    {({ login, logout, ...auth }) => {
                        const handleOk = (e) => {
                            this.signin(e, login)
                        }
                        return(<>
                        <Header>
                            <AppNav
                                { ...auth }
                                handleSigninClick={e => this.signinFormShow(e)}
                                />
                        </Header>
                        <Content>
                            {props.children}
                        </Content>
                        <Modal
                                title={formatMessage({id: 'pageTitle.signin'})}
                                visible={this.state.signinForm}
                                centered
                                destroyOnClose={true}
                                okText={formatMessage({id: 'general.signin'})}
                                cancelText={formatMessage({id: 'general.cancel'})}
                                onOk={e => handleOk(e)}
                                onCancel={e => this.handleSigninFormClose()} >
                            <WrappedSigninForm
                                wrappedComponentRef={(ref: FormRef) => this.saveSigninFormRef(ref)} />
                        </Modal>
                        <Footer>© 2019 Internation Operator Association</Footer>
                    </>)}
                }
                </AuthConsumer>
            </Layout>
          )
    }
}

export default withRouter(({ location, children }) =>
    <AuthProvider>
        <TransitionGroup>
            <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
                <BasicLayout location={location}>
                    { children }
                </BasicLayout>
            </CSSTransition>
        </TransitionGroup>
    </AuthProvider>
    )