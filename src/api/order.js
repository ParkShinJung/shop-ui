import request from '@/utils/request'

export function getOrderList() {
    const url = '/product/order'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return request.get(url, config)
}
