import router from './router'
import store from './store'
import cookie from 'js-cookie'
import { Message } from 'element-ui'

router.beforeEach((to, from, next) => {
    store.dispatch('Change_status', to.meta.aside)
    if (to.meta.checkCookie) {
        if (cookie.get('token') === undefined) {
            Message({
                message: '登录过期，请重新登录',
                type: 'warning'
            })
            router.push('/');
            return;
        }
    }
    if (to.meta.keepAlive) {
        store.dispatch('Add_list', {
            path: to.path,
            title: to.meta.title
        })
    }
    next();
})