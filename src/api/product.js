import request from '@/utils/request'

export function getProductList(params) {
    const url = '/product'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: params
    }
    return request.get(url, config)
}
