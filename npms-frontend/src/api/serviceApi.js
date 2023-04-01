import axios from '../utils/axios'

// ==================Login=====start==============================
/**
 * Login
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function login(params) {
    return axios.post('/login', params);
}

// ==================Login=====end==============================
// =====================Pate======start=========================
/**
 * to do list
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function outstandingIssues(params) {
    return axios.post('/admin/home/outstandingIssues', params);
}

/**
 * income analysis
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function revenueAnalysis(params) {
    return axios.post('/admin/home/revenueAnalysis', params);
}

/**
 * overview
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function overview(params) {
    return axios.post('/admin/home/overview', params);
}

// =====================front page======end=========================
// ==================Customer List=====start==============================
/**
 * Customer information displayed at the beginning of the customer list (a table with six fields)
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
 export function getMainPage(params) {
    return axios.get('http://localhost:8848/cusManagement/customer/getMainPage', params);
}

// ==================Customer List=====end==============================