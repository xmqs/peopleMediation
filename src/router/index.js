import Vue from 'vue'
import Router from 'vue-router'
import statisData from '@/components/statisData/statisData'

import index from './../components/statisData/index'

import list from '@/components/statisData/list'
import data from '@/components/statisData/data'
import beforeDate from '@/components/statisData/beforeDate'

import mediation from '@/components/mediation/index'
import mediationInp from '@/components/mediation/commit'
import mediationDetail from '@/components/mediation/detail'
import mediationEvaluation from '@/components/mediation/evaluation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'data',
      component: data,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/statisData',
      name: 'statisData',
      component: statisData
    },
    {
      path:'/index',
      name:'index',/*TODO 路由跳转*/
      component:index
    },
    {
      path: '/list/:static',
      name: 'list',
      component: list
    },
    {
      path: '/data',
      name: 'data',
      component: data,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/beforeDate/:indexDate',
      name: 'beforeDate',
      component: beforeDate
    },
    {
      path: '/mediation',
      name: 'mediation',
      component: mediation,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/mediation/mediationInp/:id?',
      name: 'mediationInp',
      component: mediationInp,
    },
    {
      path: '/mediation/mediationDetail/:id',
      name: 'mediationDetail',
      component: mediationDetail,
    },
    {
      path: '/mediation/evaluation/:id',
      name: 'mediationEvaluation',
      component: mediationEvaluation,
    }
  ]
})
