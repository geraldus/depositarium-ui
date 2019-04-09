import { modelExtend } from '@/utils/commonModel';
import { UserData } from '@/contexts/AuthContext';
import { postFetchAll } from '@/services/user';
import { ReduxAction, ReduxSagaEffects } from '@/interfaces';

interface UserList {
    list: UserData[]
}

const initialState = Object.freeze({
    list: []
})

type State = typeof initialState & {
    list: UserList
    ['properties']: any
}

export default modelExtend({
    namespace: 'user.manage',
    state: Object.freeze(initialState),

    effects: {
        *list(action: ReduxAction, { call, put }: ReduxSagaEffects) {
            const result = yield call(postFetchAll)
            console.log('>',result)
            yield put({
                type: 'updateState',
                payload: {
                    ...result.data.data,
                }
            })
        }
    }
})
