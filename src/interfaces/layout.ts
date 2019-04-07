import React from 'react'

export interface HaveFooterContent {
    footer?: React.ReactElement
}

export interface HaveNavBar {
    navbar?: React.ReactElement
}

export interface ContentChangeTransition {
    key?: string,
    className: string,
    timeout: number
}

export interface HaveContentChangeTransition {
    contentChangeTransition?: ContentChangeTransition
}