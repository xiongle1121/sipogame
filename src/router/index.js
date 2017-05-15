import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
    	path:'/role-condition',
    	component: resolve => require(['../components/common/home.vue'],resolve),
        redirect: '/equip',
    	children:[
            {
                path:'/',
                component: resolve => require(['../components/hero/parent.vue'],resolve),
                children: [
                    {
                        path: '/equip' ,
                        component: resolve => require(['../components/hero/children/equip.vue'],resolve)
                    },
                    {
                        path: '/bag' ,
                        component: resolve => require(['../components/hero/children/bag.vue'],resolve)
                    },
                    {
                        path: '/hero' ,
                        component: resolve => require(['../components/hero/children/hero.vue'],resolve)
                    },
                    {
                        path: '/progress' ,
                        component: resolve => require(['../components/hero/children/progress.vue'],resolve)
                    }
                ]
            },
    		{
    			path:'/equip-name-set',
    			component: resolve => require(['../components/page/equip-name-set.vue'],resolve)
    		},
            {
                path:'/equip-column-set',
                component: resolve => require(['../components/page/equip-column-set.vue'],resolve)
            },
            {
                path:'/equip-quality-set',
                component: resolve => require(['../components/page/equip-quality-set.vue'],resolve)
            },
            {
                path:'/equip-attr-set',
                component: resolve => require(['../components/page/equip-attr-set.vue'],resolve)
            },
            {
                path:'/equip-grow',
                component: resolve => require(['../components/page/equip-grow.vue'],resolve)
            },
            {
                path:'/equip-level',
                component: resolve => require(['../components/page/equip-level-params.vue'],resolve)
            },
            {
                path:'/suit',
                component: resolve => require(['../components/page/suit.vue'],resolve)
            },
            {
                path:'/suit-upgrade',
                component: resolve => require(['../components/page/suit-upgrade.vue'],resolve)
            },
            {
                path:'/voice-rank',
                component: resolve => require(['../components/page/voice-rank.vue'],resolve)
            },
            {
                path:'/voice-check',
                component: resolve => require(['../components/page/voice-check.vue'],resolve)
            },
            {
                path:'/test',
                component: resolve => require(['../components/page/test.vue'],resolve)
            }
    	]
    },
    {
    	path:'/login',
    	component: resolve => require(['../components/page/login.vue'],resolve)
    }
  ]
})
