<template>
  <el-container class="mainPage">

    <el-aside class="hidden-md-and-down">
      <history-table :input="inputHistory"></history-table>
    </el-aside>

    <el-main>
      <el-row>

        <el-col :lg="{span:12,offset:6}"
                :md="{span: 24}" class="calculatorBoard">
          <el-row>
            <el-col :offset="2" :span="20">
              <el-input v-model="calculator.curValue"
                        @keyup.native="keyMonitor"
                        placeholder="ans"></el-input>

            </el-col>
          </el-row>
          <operator-button v-for="(button,index) in calculator.button"
                           :key="index"
                           :value='button.value'
                           :label='button.label'></operator-button>
        </el-col>

      </el-row>
      <el-row class="hidden-lg-and-up">
        <history-table
          :height="250"
          :input="inputHistory"></history-table>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
  import OperatorButton from "./Dialog/OperatorButton"
  import * as Events from '../foundation/event-hub'
  import {passInputToCalculator} from "../api/api-utils";
  import 'element-ui/lib/theme-chalk/display.css';
  import historyTable from "./Dialog/historyTable";

  export default {
    name: 'Calculator',
    components: {historyTable, OperatorButton},
    data() {
      return {
        calculator: {
          input: '',
          curValue: '',
          savedValue: '',
          button: {
            //col 1
            seven: {value: '7', label: '7'},
            eight: {value: '8', label: '8'},
            nine: {value: '9', label: '9'},
            divide: {value: '/', label: '÷'},

            //col 2
            four: {value: '4', label: '4'},
            five: {value: '5', label: '5'},
            six: {value: '6', label: '6'},
            times: {value: '*', label: '*'},

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
        },
        inputHistory: [],
        operatorSet: ['+', '-', '*', '/', '.', '(', ')']
      }
    },
    created: function () {
      Events.hub.$on(Events.PASS_INPUT_TO_CALCULATOR, input => this.handleInput(input))
    },

    methods: {
      passInputToCalculator,
      handleInput(input) {
        this.unShiftInputToHistory(input)
        switch (true) {
          case (input === 'clear'):
            this.calculator.curValue = '0'

          case (input === '='):
            this.calculateResult()
            break

          case (this.isOperator(input)):
            this.calculator.curValue =
              this.checkDuplicate(this.calculator.curValue, input,
                this.isOperator(this.calculator.curValue.slice(-1)))
            break

          case (this.isSingleNumber(input)):
            this.calculator.curValue =
              ((this.calculator.curValue.slice(-1) === '0') ?
                this.simplifyZero(this.calculator.curValue) : this.calculator.curValue) + input
            break

          default:
            Events.hub.$emit(Events.SHOW_ERROR_MESSAGE, "invalid Number")
        }
      },
      unShiftInputToHistory(input) {
        const tableMaxSize = 10
        let arrLength = this.inputHistory.length
        let isReachedMaxSize = (arrLength >= tableMaxSize)
        if (isReachedMaxSize) this.inputHistory = this.inputHistory.slice(0, 9)
        this.inputHistory.unshift({value: input})
      },

      calculateResult() {
        let calculatedResult
        try {
          calculatedResult = eval(this.calculator.curValue).toString()
        } catch (e) {
          Events.hub.$emit(Events.SHOW_ERROR_MESSAGE, "can not calculated")
        }
        this.calculator.curValue = calculatedResult
        this.unShiftInputToHistory(calculatedResult)
      },
      keyMonitor: function (event) {
        let pressedKey = event.key
        let isPressLetter = (event.which >= 65 && event.which <= 90)
        switch (true) {
          case (pressedKey === '='):
            this.calculator.curValue = this.calculator.curValue.slice(0, -1)

          case  (pressedKey === 'Enter'):
            this.calculateResult()
            break

          case (this.isOperator(pressedKey)):

            if (this.calculator.curValue.length > 1) {
              this.calculator.curValue = this.checkDuplicate(this.calculator.curValue.slice(0, -1),
                pressedKey,
                this.isOperator(this.calculator.curValue.charAt(this.calculator.curValue.length - 2)))
            }
            break
          case (isPressLetter):
            this.calculator.curValue = this.calculator.curValue.slice(0, -1)
            Events.hub.$emit(Events.SHOW_ERROR_MESSAGE, "unsupported Operator")
            break
          default:
            Object.keys(this.calculator.button).forEach(
              e => {
                if (this.calculator.button[e].value === pressedKey) {
                  this.unShiftInputToHistory(pressedKey)
                  this.calculator.curValue =
                    ((this.calculator.curValue.slice(-1) === '0') ?
                      this.simplifyZero(this.calculator.curValue)
                      : this.calculator.curValue)
                }
              })
        }
      },
      isOperator(input) {
        return (this.operatorSet.filter(t => t === input).length > 0)
      },
      isSingleNumber(input) {
        return ((parseInt(input) > 0 && parseInt(input) < 10))
      },
      simplifyZero(curValue) {
        let index = curValue.length - 1
        let lastDigit = curValue.charAt(index)

        while (lastDigit === '0') {
          index--
          lastDigit = curValue.charAt(index)
        }
        const hasExcessZero = !(this.isSingleNumber(lastDigit) || (lastDigit === '.'))
        return (hasExcessZero) ? curValue.slice(0, index + 1) : curValue
      },
      checkDuplicate(curValue, input, isDuplicated) {
        return ((isDuplicated) ? curValue.slice(0, -1) : curValue) + input
      },
    }
  }
</script>

<style scoped>

  .calculatorBoard {
    border: 8px solid #5e4c65;
    background-color: #b0dcff;
    padding: 10px;
    border-radius: 10px;
  }
  .mainPage{
    background-image: url("../assets/background.jpg") ;

    /* Full height */
    height: 100%;

    background-size: cover;
  }

</style>
