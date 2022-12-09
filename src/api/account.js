import request from '@/utils/request'

export function getMemberList(params) {
    const url = '/account/member'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: params
    }
    return request.get(url, config)
}

export function registerAccount(params) {
    const url = '/account/member'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return request.post(url, params, config)
}

export function getDupMemberId(memberId) {
    const url = '/account/signup/id/' + memberId
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return request.get(url, config)
}

export function logInCheck(memberId, params) {
    const url = '/account/checkLogin/' + memberId
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return request.post(url, params, config)
}
