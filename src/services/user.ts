import request from '@/utils/request';

export async function postAuthInfo() {
    return request({
        url: '/api/user/info',
        method: 'post'
    });
}

export async function postPluginAuthLogout() {
    return request({
        url: '/auth/page/prizm-json-plugin/logout',
        method: 'post'
    });
}

export async function postPluginAuthLogin(payload) {
    console.log('ASYNC AUTH', payload)
    return request({
        url: '/auth/page/prizm-json-plugin/login',
        method: 'post',
        data: payload
    });
}
