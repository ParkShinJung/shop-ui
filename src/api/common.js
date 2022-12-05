import request from '@/utils/request'

export function getCategoryList() {
    const url = '/category'
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return request.get(url, config)
}
