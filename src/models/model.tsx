import produce from 'immer'
import { message } from 'antd'
import { postPluginAuthLogout, postAuthInfo, postPluginAuthLogin } from '@/services/user'
import { modelExtend } from '@/utils/commonModel'
import { ReduxSagaEffects, ReduxAction } from '@/interfaces'
import { formatMessage } from 'umi-plugin-locale';
import { mkIdent } from '@/utils/user';

const initialState = Object.freeze({
    auth: false,
    accessRights: [],
    signinFormVisible: false,
    formErrors: [],
})

type State = typeof initialState & {
    ['properties']: any
}


const guest = (state: State) => produce(state, draft => initialState)

export default modelExtend({
    namespace: 'user',

    state: Object.freeze(initialState),

    reducers: {
        setGuest: () => (initialState),
        setCreds(state: State, action: ReduxAction) {
            message.success([
                formatMessage({ id: 'feedback.auth.authorized-as' }),
                mkIdent(action.payload)
            ].join(' '))
            return {
                auth: true,
                ...action.payload,
                signinFormVisible: false,
                formErrors: []
            }
        },
        setSigninFormVisibility(state: State, action: ReduxAction) {
            state.signinFormVisible = action.payload
        }
    },

    effects: {
        *info(action: ReduxAction, { call, put }: ReduxSagaEffects) {
            const result = yield call(postAuthInfo)
            yield put({
                type: 'updateState',
                payload: {
                    ...result.data,
                }
            })
        },
        *signin(action: ReduxAction, { call, put }: ReduxSagaEffects) {
            const { payload } = action
            const formData = new FormData()
            formData.append('username', payload['username'])
            formData.append('password', payload['password'])
            const result = yield call(postPluginAuthLogin, formData)
            // console.log('got result', action, result, result.constructor)
            if (result.data.status) {
                if (result.data.status == 'fail') {
                    yield put({
                        type: 'updateState',
                        payload: {
                            auth: false,
                            formErrors: [result.data.message]
                        }
                    })
                } else {
                    if (result.data.status == 'ok') {
                        yield put({
                            type: 'setCreds', payload: result.data.data,
                        })
                    }
                }
            }
        },
        *signout({ }, { call, put }: ReduxSagaEffects) {
            yield call(postPluginAuthLogout)
            yield put({
                type: 'setGuest'
            });
        },
    },

});



