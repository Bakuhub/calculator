<template>
  <el-container>
    <el-aside>
      <el-table
        :data="inputHistory"
        style="width: 100%">
        <el-table-column
          prop="value"
          label="input"
        >
        </el-table-column>
      </el-table>
    </el-aside>
    <el-main>
      <el-row :gutter="1">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input v-model="calculator.curValue"
                      @keyup.native="keyMonitor"
                      placeholder="ans"></el-input>

          </div>
        </el-col>
      </el-row>

      <el-col :span="24">
        <div>{{calculator.savedValue}}</div>
      </el-col>

      <operator-button v-for="(button,index) in calculator.button"
                       :key="index"
                       :value='button.value'
                       :label='button.label'></operator-button>
    </el-main>
  </el-container>
</template>

<script>
  import OperatorButton from "./Dialog/OperatorButton"
  import * as Events from '../foundation/event-hub'
  import {passInputToCalculator} from "../api/api-utils";

  export default {
    name: 'Calculator',
    components: {OperatorButton},
    data() {
      return {
        calculator: {
          input: '',
          curValue: '',
          savedValue: '',
          button: {
            //col 1
            7: {value: '7', label: '7'},
            8: {value: '8', label: '8'},
            9: {value: '9', label: '9'},
            divide: {value: '/', label: '÷'},

            //col 2
            4: {value: '4', label: '4'},
            5: {value: '5', label: '5'},
            6: {value: '6', label: '6'},
            times: {value: '*', label: '*'},

            //col 3
            1: {value: '1', label: '1'},
            2: {value: '2', label: '2'},
            3: {value: '3', label: '3'},
            minus: {value: '-', label: '-'},

            //col 4
            clear: {value: 'clear', label: 'AC'},
            0: {value: '0', label: '0'},
            equal: {value: '=', label: '='},
            plus: {value: '+', label: '+'},
          }
        },
        inputHistory: [],
        operatorSet: ['+', '-', '*', '/',]
      }
    },
    created: function () {
      Events.hub.$on(Events.PASS_INPUT_TO_CALCULATOR, input => this.handleInput(input))
    }
    , methods: {
      passInputToCalculator,
      handleInput(input) {
        this.inputHistory.unshift({value: input})
        switch (true) {
          case (input === 'clear'):
            this.calculator.curValue = '0'

          case (input === '='):
            this.calculateResult()
            break

          case (this.isOperator(input)):
            this.calculator.curValue =
              this.checkDuplicate(this.calculator.curValue,
                input,
                this.isOperator(this.calculator.curValue.slice(-1)))
            break

          case (this.isNumber(input)):
            this.calculator.curValue =
              ((this.calculator.curValue.slice(-1) === '0') ?
                this.simplifyZero(this.calculator.curValue) : this.calculator.curValue) + input
            break

          default:
            Events.hub.$emit(Events.SHOW_ERROR_MESSAGE, "invalid Number")
        }
      },
      calculateResult() {
        try {
          let calculatedResult = eval(this.calculator.curValue).toString()
          this.calculator.curValue = calculatedResult
          this.inputHistory.unshift({value: calculatedResult})
        } catch (e) {
          Events.hub.$emit(Events.SHOW_ERROR_MESSAGE, e)
        }
      },
      keyMonitor: function (event) {
        let pressedKey = event.key
        Object.keys(this.calculator.button).forEach(
          e => {
            if (this.calculator.button[e].value === pressedKey)
              this.handleInput(pressedKey)
          })

        if (pressedKey === 'enter')
          this.calculateResult()
      },
      isOperator(input) {
        return (this.operatorSet.filter(t => t === input).length > 0)
      },
      isNumber(input) {
        return (parseInt(input) >= 0 && parseInt(input) < 10)
      },
      simplifyZero(curValue) {
        const lastDigit = curValue.slice(-1)


        if (lastDigit === '0') {
          return this.simplifyZero(curValue.slice(0, -1))
        }
        else if (this.isNumber(lastDigit) || (lastDigit === '.')) {
          return curValue
        } else
          return curValue.slice(0, -1)


      },
      checkDuplicate(curValue, input, isDuplicated) {
        return ((isDuplicated) ? curValue.slice(0, -1) : curValue) + input
      },
      addInputToCurValue(input) {

      }

    }
  }
</script>

<style scoped>

</style>
