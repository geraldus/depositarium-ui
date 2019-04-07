import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Layout } from 'antd'
import {
    ContentChangeTransition,
    HaveContentChangeTransition,
    HaveFooterContent,
    HaveNavBar
} from '@/interfaces/layout'

const { Header, Content, Footer } = Layout



const defaultTransition: ContentChangeTransition = Object.freeze({
    className: 'fade',
    timeout: 300
})

type Props = React.ComponentPropsWithoutRef<React.ElementType>
        & HaveNavBar
        & HaveFooterContent
        & HaveContentChangeTransition


const defaultProps: HaveContentChangeTransition = Object.freeze({
    contentChangeTransition: defaultTransition
})

class DesktopLayout extends React.Component<Props> {
    static readonly defaultProps = defaultProps
    render () {
        return (
            <Layout>
                <Header>
                    {this.props.navbar}
                </Header>
                <TransitionGroup>
                    <CSSTransition
                        timeout={defaultTransition.timeout}
                        { ...this.props.contentChangeTransition}>
                        <Content>
                            {this.props.children}
                        </Content>
                    </CSSTransition>
                </TransitionGroup>
                <Footer>{this.props.footer}</Footer>
            </Layout>
        )
    }
}

export default DesktopLayout
