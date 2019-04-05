import mockjs from 'mockjs'


export default {
    'POST /auth/page/prizm-json-plugin/login': mockjs.mock({
        'status': 'ok',
        'data': {
            'ident': 'geraldus',
            'id': 1
        }
    }),
    'POST api/user/read/12': mockjs.mock({
        'email': 'heraldhoi@gmail.com',
        'accessRights': [
            'ConfirmDeposit',
            'ConfirmWithdrawal',
            'RejectDeposit',
            'RejectWithdrawal',
            'MakeDeposit',
            'RequestWithdrawal',
            'SelfBalanceView',
            'SelfBalanceHistory',
            'SelfListDeposit',
            'SelfListWithdrawal',
            'SelfDepositCancel',
            'SelfWithdrawalCancel',
            'ListWithdrawal',
            'ListDeposit',
            'DeleteCurrency',
            'UpdateCurrency',
            'CreateCurrency',
            'ListCurrency',
            'DeleteUser',
            'UpdateUser',
            'ViewUser',
            'CreateUser',
            'ListUsers'
        ],
        'lastName': 'Файзрахманов',
        'patronymic': 'Сахиевич',
        'verified': true,
        'ident': 'geraldus',
        'firstName': 'Артур',
        'id': 12
    })

}