import React from 'react'

import { default as Layout } from './gen/desktop'
import { AppNav } from '@/containers/app/nav'


export class DesktopLayout extends React.Component {
    render () {
        return (
            <Layout navbar={<AppNav></AppNav>}>
                {this.props.children}
            </Layout>
        )
    }
}