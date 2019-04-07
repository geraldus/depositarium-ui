import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Flex, WhiteSpace, WingBlank } from 'antd-mobile'
import {
    ContentChangeTransition,
    HaveContentChangeTransition,
    HaveFooterContent,
    HaveNavBar
} from '@/interfaces/layout'


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

class MobileLayout extends React.Component<Props> {
    static readonly defaultProps = defaultProps
    render () {
        return (
        <>
            {this.props.navbar}
            <Flex>
                <WhiteSpace size='lg'/>
                <WingBlank size='md'>
                    <TransitionGroup>
                        <CSSTransition
                                timeout={defaultTransition.timeout}
                                { ...this.props.contentChangeTransition}>
                            {this.props.children}
                        </CSSTransition>
                    </TransitionGroup>
                </WingBlank>
                {this.props.footer}
            </Flex>
        </>)
    }
}

export default MobileLayout
