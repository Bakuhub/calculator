import * as types from '../mutation-types'

const state = {
  displayValue: 0,
  savedOperator: "",
  savedValue: "",
  inputHistory: [],
  calculatorButton: {
    //col 1
    seven: {value: '7', label: '7'},
    eight: {value: '8', label: '8'},
    nine: {value: '9', label: '9'},
    divide: {value: '/', label: '÷'},

    //col 2
    four: {value: '4', label: '4'},
    five: {value: '5', label: '5'},
    six: {value: '6', label: '6'},
    times: {value: '*', label: 'x'},

    //col 3
    one: {value: '1', label: '1'},
    two: {value: '2', label: '2'},
    three: {value: '3', label: '3'},
    minus: {value: '-', label: '-'},

    //col 4
    clear: {value: 'clear', label: 'AC'},
    zero: {value: '0', label: '0'},
    equal: {value: '=', label: '='},
    plus: {value: '+', label: '+'},
  }
}

const getters = {}

const actions = {
  [types.ACTION_UPDATE_DISPLAY_VALUE]({commit, state}, displayValue) {
    commit(types.ACTION_UPDATE_DISPLAY_VALUE, displayValue)
  },
  [types.ACTION_INSERT_INPUT_HISTORY]({commit, state}, input) {
    commit(types.ACTION_INSERT_INPUT_HISTORY, input)
  },
  [types.ACTION_UPDATE_OPERATOR]({commit, state}, operator) {
    commit(types.ACTION_UPDATE_OPERATOR, operator)
  },
}

const mutations = {
  [types.ACTION_UPDATE_DISPLAY_VALUE](state, displayValue) {
    state.displayValue = (state.savedOperator)? displayValue:state.displayValue+displayValue
  },
  [types.ACTION_INSERT_INPUT_HISTORY](state, input) {
    const tableMaxSize = 10
    let arrLength = state.inputHistory.length
    let isReachedMaxSize = (arrLength >= tableMaxSize)
    if (isReachedMaxSize) this.inputHistory = this.inputHistory.slice(0, 9)
    state.inputHistory.unshift({value: input})
  },
  [types.ACTION_UPDATE_DISPLAY_VALUE](state, operator) {
    let needCalculated = (state.savedOperator && state.savedValue && state.displayValue)
    if (needCalculated) state.displayValue = eval(state.savedValue + state.savedOperator + state.displayValue)
    state.savedOperator = operator
  },



}


export default {
  state,
  getters,
  actions,
  mutations,
}
