import React from 'react'
import { Card, Icon, Avatar, Row, Col, Typography, PageHeader } from 'antd'
import { UserData } from '@/contexts/AuthContext';
import { mkIdent, mkFullName } from '@/utils/user';
import { formatMessage } from 'umi-plugin-locale';

const { Meta } = Card


export interface HaveUserList {
    list: UserData[]
}

type Props = HaveUserList

const defaultProps: Props = Object.freeze({
    list: []
})

export class UserCard extends React.Component<UserData> {
    static readonly defaultProps = defaultProps
    composeTitle() {
        const data = this.props
        const name = mkFullName(data)
        const ident = data.ident
        const email = data.email
        return name || (ident != email ? ident : email)
    }
    composeDescription() {
        let title = this.composeTitle()
        let name = mkFullName(this.props)
        return (<>
            {name != title && <p className="name">{name}</p>}
            {this.props.ident != title && <p className="ident">{this.props.ident}</p>}
            {this.props.email != title
                && this.props.email != this.props.ident
                && <p className="email">{this.props.email}</p>}
        </>
        )
    }
    render() {
        return (<Card
            style={{ width: 300 }}
            actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        >
            <Meta
                avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />}
                title={this.composeTitle()}
                description={this.composeDescription()}
            />
        </Card>)
    }
}

export default class UserListView extends React.Component<Props> {
    static readonly defaultProps: Props = defaultProps
    composeGrid() {
        let cols = this.props.list.reduce((acc_: React.ReactNode[], val) => {
            let acc = typeof acc_ === typeof undefined ? [[]] : acc_
            acc = typeof acc[0] === typeof undefined ? [[]] : acc
            console.log(acc, acc_, acc[acc.length], acc.constructor)
            let item = (
                <Col xs={20} sm={12} md={8} lg={4} style={{ marginTop: 16 }} >
                    <Row type='flex' justify='center'>
                        <Col>
                            <UserCard {...val} style={{ margin: 'auto' }} />
                        </Col>
                    </Row>

                </Col>
            )
            const last = acc[acc.length - 1]
            if (last.length == 3) {
                acc = [...acc, [item]]
            } else {
                acc[acc.length - 1].push(item)
            }
            return acc
        }, [[]])
        return cols.map((c, i) => {
            return (
                <Row type='flex' justify='space-around' key={i} gutter={16}>
                    {c}
                </Row>
            )
        })
    }
    render() {
        return (<>
            <PageHeader title={formatMessage({ id: 'manage.user.list.page.title' })}/>
            <Row>
                <Col>

                    {this.composeGrid()}
                    {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
                </Col>
            </Row >
        </>)
    }
}