import React, { createRef, ComponentPropsWithRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
// import { WidthProvider } from 'react-grid-layout'
import { Modal, Layout, Row, Col } from 'antd'
import { formatMessage } from 'umi-plugin-locale'
import { connect } from 'dva'
import withRouter from 'umi/withRouter';
import AppNav from '@/containers/app-nav';
import { AuthProvider, UserContext } from '@/contexts/AuthContext'
import { AuthConsumer, AuthContext } from '@/contexts/AuthContext'
import { WrappedSigninForm, SigninForm } from '@/containers/form/signin'
import _ from 'lodash'

import styles from 'antd/dist/antd.css'

const { Header, Content, Footer } = Layout

const defaultProps = {
    user: {
        accessRights: [],
        signinFormVisible: false
    },
    dispatch: () => { },
}
const initialState = {
    signinForm: false
}

type Props =
    typeof defaultProps
    & RouteComponentProps
    & ComponentPropsWithRef<any>
type FormRef = React.RefObject<SigninForm> & React.ComponentPropsWithoutRef<SigninForm>
type State = typeof initialState


class BasicLayout extends React.Component<Props, State> {
    static contextType = AuthContext
    static readonly defaultProps = defaultProps
    readonly state = initialState
    private signinFormRef = createRef<FormRef>()
    componentDidMount() {
        this.props.dispatch({ type: 'user/info' })
    }
    saveSigninFormRef(formRef: FormRef) {
        this.signinFormRef = formRef
    }
    signinFormShow(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault()
        this.props.dispatch({
            type: 'user/updateState',
            payload: {
                signinFormVisible: true
            }
        })
    }
    handleSigninFormClose() {
        this.props.dispatch({
            type: 'user/updateState',
            payload: {
                signinFormVisible: false
            }
        })
    }
    handleAuthResult(r, login: (e: UserContext) => void) {
        const form = this.signinFormRef.props.form
        // TODO: Provide type for 'r'
        switch (r.status) {
            case 'fail':
                form.setFields({
                    password: {
                        value: form.getFieldValue('password'),
                        errors: [new Error(r.message)]
                    }
                })
                break
            case 'ok': {
                login(r.data)
                this.handleSigninFormClose()
            }
        }
    }
    signin(e: React.FormEvent, login: (e: UserContext) => void) {
        const { dispatch } = this.props
        const form = this.signinFormRef.props.form
        form.validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'user/signin',
                    payload: values
                })
            }
        })
    }
    render() {
        const { props } = this
        const { location } = props
        const formVisible = this.props.user.signinFormVisible
        return (
            <AuthConsumer>
                {({ login, logout, ...auth }) => {
                    const handleOk = (e) => {
                        this.signin(e, login)
                    }
                    return (<Layout>
                        <Header>
                            <AppNav
                                {...this.props.user}
                                handleSigninClick={e => this.signinFormShow(e)}
                            />
                        </Header>

                        {/* <TransitionGroup> */}
                        {/* <CSSTransition key={location.pathname} classNames="fade" timeout={300}> */}
                        <Content key={location.pathname}>
                            {props.children}
                        </Content>
                        {/* </CSSTransition> */}
                        {/* </TransitionGroup> */}
                        <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
                        <Modal
                            title={formatMessage({ id: 'pageTitle.signin' })}
                            visible={formVisible}
                            centered
                            destroyOnClose={true}
                            okText={formatMessage({ id: 'general.signin' })}
                            cancelText={formatMessage({ id: 'general.cancel' })}
                            onOk={e => handleOk(e)}
                            onCancel={e => this.handleSigninFormClose()} >
                            <WrappedSigninForm
                                formErrors={this.props.formErrors}
                                wrappedComponentRef={(ref: FormRef) => this.saveSigninFormRef(ref)} />
                        </Modal>
                        <Footer>© 2019 Internation Operator Association</Footer>
                    </Layout>)
                }
                }
            </AuthConsumer>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.user,
        signinFormVisible: state.user.signinFormVisible
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({
        dispatch: dispatch
    })
}


const AuthProvidedLayout = ({ location, children, dispatch, user }) => (
    <AuthProvider>
        <BasicLayout location={location} dispatch={dispatch} user={user}>
            {children}
        </BasicLayout>
    </AuthProvider>
)

const ConnectedLayout = connect(mapStateToProps, mapDispatchToProps)(AuthProvidedLayout)

const RoutedLayout = withRouter(ConnectedLayout)

export default RoutedLayout
