import React, { Children } from 'react';
import { AppNav } from '@/containers/app-nav';
import { Layout, Menu, Breadcrumb, Icon } from 'antd'

import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { AuthProvider } from '@/contexts/AuthContext'


const {
    Header, Content, Footer, Sider,
  } = Layout

type Props = {
    location: typeof window.location,
}


class BasicLayout extends React.Component<Props> {
    render () {
        const { props } = this
        return (
            <AuthProvider>
                <Layout>
                    <Header>
                        <AppNav/>
                    </Header>
                    {props.children}
                </Layout>
            </AuthProvider>
          )
    }
}

export default withRouter(({ location, children }) => <TransitionGroup>
    <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <BasicLayout location={location}>
            { children }
        </BasicLayout>
    </CSSTransition>
</TransitionGroup>);
