import produce from 'immer'
import { message } from 'antd'
import { postPluginAuthLogout, postAuthInfo, postPluginAuthLogin } from '@/services/user'
import { modelExtend } from '@/utils/commonModel'
import { ReduxSagaEffects, ReduxAction } from '@/interfaces'
import { formatMessage } from 'umi-plugin-locale';
import { mkIdent } from '@/utils/user';

const initialState = Object.freeze({
    width: 1920
})

type State = typeof initialState


export default modelExtend({
    namespace: 'app',
    state: Object.freeze(initialState),
    reducers: {
        set: ({}, action: ReduxAction) => ({ width: action.payload })
    }
})