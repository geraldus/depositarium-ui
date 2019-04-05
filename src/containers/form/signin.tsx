import React from 'react'
import { Form, Input, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { formatMessage } from 'umi-plugin-locale'


export class SigninForm extends React.Component<FormComponentProps> {
    handleSubmit (e: React.FormEvent) {
        console.log(e)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            } else {
                console.log('Form errors', err)
            }
        })
    }
    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={e => this.handleSubmit(e)}>
                <Form.Item>
                    { getFieldDecorator(
                        'username',
                        {
                            rules: [{
                              required: true,
                              message: formatMessage({id: 'form.error.usernameRequired'})
                            }],
                        })
                        (
                            <Input
                                prefix={
                                    <Icon
                                        type="user"
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                placeholder={formatMessage({id: 'form.placeholder.username'})}
                                />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    { getFieldDecorator(
                        'password',
                        {
                            rules: [{
                              required: true,
                              message: formatMessage({id: 'form.error.passwordRequired'})
                            }],
                        })
                        (
                            <Input
                                prefix={
                                    <Icon
                                        type="lock"
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                type='password'
                                placeholder={formatMessage({id: 'form.placeholder.password'})}
                                />
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

export const WrappedSigninForm = Form.create({ name: 'signin' })(SigninForm)