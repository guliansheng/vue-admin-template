import { asyncRoutes, constantRoutes } from '@/router'


/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRoutes, roles) {
  let routeRes = []
  if (!roles || !roles.length) {
    return []
  } else {
    asyncRoutes.map(_route => {
      let res = {}
      if (_route.code && roles.find(_role => _role.code + '' === _route.code + '')) {
        res = _route
      }
      if (_route.code && _route.children && _route.children.length) {
        res.children = _route.children.filter(_child => _child.code && roles.find(_role => _role.code + '' === _child.code + ''))
      } else {
        res.children = null
      }
      res.children && res.children.length ? res.redirect = `${res.path}/${res.children[0].path}` : null
      res.children && res.children.length && routeRes.push(res)
    })
  }
  return routeRes
}


const state = {
  routes: constantRoutes,
  addRouters: []
}

const mutations = {
  SET_ROUTERS: (state, routes) => {
    state.addRouters = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit, state }, data) {
    return new Promise(resolve => {
      // const { roles } = data
      // let accessedRouters = filterAsyncRouter(asyncRouterMap, data)
      commit('SET_ROUTERS', asyncRoutes)
      resolve(state.addRouters)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

