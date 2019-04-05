import mockjs from 'mockjs'


export default {
    'POST /auth/page/prizm-json-plugin/login': mockjs.mock({
        'status': 'fail',
        'message': 'Неверное сочетание имени пользователя и пароля'
    })
}