import * as types from '../mutation-types'

const state = {
  followTraderId: '',
  isLogin: true,
  isShowFilter: false,
  isShowSocial: false,
  isShowFollow: false,
  isShowNotify: false,
  isShowForgetPwd: false,
  isLeftMenuOpen: 'left-menu',
}

const getters = {
}

const actions = {
  [types.ACTION_IS_SHOW_FILTER] ({ commit, state }) {
    commit(types.IS_SHOW_FILTER, !state.isShowFilter)
  },
  [types.ACTION_IS_SHOW_SOCIAL] ({ commit, state }) {
    commit(types.IS_SHOW_SOCIAL, !state.isShowSocial)
  },
  [types.ACTION_IS_SHOW_FOLLOW] ({ commit, state }) {
    commit(types.IS_SHOW_FOLLOW, !state.isShowFollow)
  },
  [types.ACTION_IS_NOTIFY_BOX_OPEN] ({ commit, state }) {
    commit(types.IS_NOTIFY_BOX_OPEN, !state.isShowNotify)
  },
  [types.ACTION_IS_SHOW_FORGET_PWD] ({ commit, state }) {
    commit(types.IS_SHOW_FORGET_PWD, !state.isShowForgetPwd)
  },
  [types.ACTION_IS_LEFT_MENU_OPEN] ({ commit, state }) {
    let isLeftMenuOpen = ''

    if (state.isLeftMenuOpen === 'left-menu') {
      isLeftMenuOpen = 'left-menu open'
    } else {
      isLeftMenuOpen = 'left-menu'
    }

    commit(types.IS_LEFT_MENU_OPEN, isLeftMenuOpen)
  },
  [types.ACTION_FOLLOW_TRADER_ID] ({ commit, state }, followTraderId) {
    commit(types.FOLLOW_TRADER_ID, followTraderId)
  },
  [types.ACTION_TRADER_NICKNAME] ({ commit, state }, traderNickname) {
    commit(types.TRADER_NICKNAME, traderNickname)
  },
  [types.ACTION_TRADER_NUM] ({ commit, state }, traderNum) {
    commit(types.TRADER_NUM, traderNum)
  },
  [types.ACTION_TRADER_NICKNAME_WITH_NUM] ({ commit, state }, traderNicknameWithNum) {
    commit(types.TRADER_NICKNAME_WITH_NUM, traderNicknameWithNum)
  },
  [types.ACTION_FILTER_COMPONENT] ({ commit, state }, filterSet) {
    commit(types.ACTION_FILTER_COMPONENT, filterSet)
  }
}

const mutations = {
  [types.IS_SHOW_FILTER] (state, isShowFilter) {
    state.isShowFilter = isShowFilter
  },
  [types.IS_SHOW_SOCIAL] (state, isShowSocial) {
    state.isShowSocial = isShowSocial
  },
  [types.IS_SHOW_FOLLOW] (state, isShowFollow) {
    state.isShowFollow = isShowFollow
  },
  [types.IS_NOTIFY_BOX_OPEN] (state, isShowNotify) {
    state.isShowNotify = isShowNotify
  },
  [types.IS_SHOW_FORGET_PWD] (state, isShowForgetPwd) {
    state.isShowForgetPwd = isShowForgetPwd
  },
  [types.IS_LEFT_MENU_OPEN] (state, isLeftMenuOpen) {
    state.isLeftMenuOpen = isLeftMenuOpen
  },
  [types.FOLLOW_TRADER_ID] (state, followTraderId) {
    state.followTraderId = followTraderId
  },
  [types.TRADER_NICKNAME] (state, traderNickname) {
    state.traderNickname = traderNickname
  },
  [types.TRADER_NUM] (state, traderNum) {
    state.traderNum = traderNum
  },
  [types.TRADER_NICKNAME_WITH_NUM] (state, traderNicknameWithNum) {
    state.traderNicknameWithNum = traderNicknameWithNum
  },
  [types.ACTION_FILTER_COMPONENT] ( state, filterSet) {
    state.filterSet = filterSet
  }
}


export default {
  state,
  getters,
  actions,
  mutations,
}
