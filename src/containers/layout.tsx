import React, { createRef, ComponentPropsWithRef, ComponentProps } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Modal, Layout } from 'antd'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import AppNav from '@/containers/app-nav';
import { AuthProvider, UserContext } from '@/contexts/AuthContext'
import { AuthConsumer, AuthContext } from '@/contexts/AuthContext'
import { WrappedSigninForm, SigninForm } from '@/containers/form/signin'

import withRouter from 'umi/withRouter';
import _ from 'lodash'
import { formatMessage } from 'umi-plugin-locale'
import { connect } from 'dva'

import styles from 'antd/dist/antd.css'
import { stat } from 'fs';

const { Header, Content, Footer } = Layout

export class DesktopLayout extends React.Component{
    render () {
        return (
            <Layout>
                <Header>
                    NAV
                </Header>
                <TransitionGroup>
                    <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
                        <Content>
                            {this.props.children}
                        </Content>
                    </CSSTransition>
                </TransitionGroup>
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
        </Layout>
)
}
    }