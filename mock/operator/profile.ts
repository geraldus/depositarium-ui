import mockjs from 'mockjs'
import moment from 'moment'

const x = moment().subtract(30, 'days')
const y = moment().subtract(11, 'days')


export default {
    'GET /api/operator/profile': mockjs.mock({
        'balance': {
            'pzm': {
                'value': 10000,
                'date': x.valueOf(),
            },
            'rur': {
                'value': 250000,
                'date': y.valueOf(),
            }
        }
    })
}