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

export function getCategoryList() {
    const url = '/category'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return request.get(url, config)
}
