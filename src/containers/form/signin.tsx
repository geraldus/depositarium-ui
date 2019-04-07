import React from 'react'
import { Form, Input, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { formatMessage } from 'umi-plugin-locale'
import { connect } from 'dva'

interface WithContext {
    context: any
}

type Props = FormComponentProps & React.RefObject<HTMLElement> & WithContext

export class SigninForm extends React.Component<Props> {
    render () {
        const { getFieldDecorator } = this.props.form
        const errors = this.props.formErrors.map(e => new Error(e) )
        return (
            <Form>
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
                <Form.Item
                        validateStatus={this.props.formErrors.length > 0 ? 'error' : undefined}
                        help={errors.map(x => x.message).join('; ')}>
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

const mapStateToProps = (state) => ({
    formErrors: state.user.formErrors
})

export const WrappedSigninForm = connect(mapStateToProps)(Form.create({ name: 'signin' })(SigninForm))