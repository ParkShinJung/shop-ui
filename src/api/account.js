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
