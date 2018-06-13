<template>
  <el-container class="mainPage">
    <el-aside class="hidden-md-and-down">
      <history-table :input="inputHistory">

      </history-table>
    </el-aside>

    <el-main>
      <el-row>

        <el-col :lg="{span:12,offset:6}" :md="{span: 24}" class="calculatorBoard">
          <el-row>
            <el-col :offset="1" :span="22">
              <el-input v-model="displayValue"
                        class="inputBar"
                        @keypress.native="keyMonitor"
                        placeholder="ans">
                <template class="inputBar" slot="append">
                  {{operator}}
                </template>
              </el-input>

            </el-col>
          </el-row>

          <operator-button v-for="(button,index) in calculatorButton"
                           :key="index"
                           :value='button.value'
                           :label='button.label'>
          </operator-button>
        </el-col>

      </el-row>
      <el-row class="hidden-lg-and-up">
        <history-table
          :height="250"
          :input="inputHistory">

        </history-table>
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
  import * as types from "../store/mutation-types"
  import {isSingleNumber} from "../api/api-utils";
  import {isOperator} from "../api/api-utils";

  export default {
    name: 'Calculator',
    components: {historyTable, OperatorButton},

    data() {
      return {}
    },
    computed: {
      calculatorButton: function () {
        return this.$store.state.common.calculatorButton
      },
      inputHistory: function () {
        return this.$store.state.common.inputHistory
      },
      displayValue: function () {
        return this.$store.state.common.displayValue
      },
      operator: function () {
        return this.$store.state.common.savedOperator
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
            this.$store.dispatch(types.ACTION_CLEAR_CALCULATOR)
            break

          case (isOperator(input)):
            this.$store.dispatch(types.ACTION_UPDATE_OPERATOR, input)
            break

          case (isSingleNumber(input)):
            this.$store.dispatch(types.ACTION_UPDATE_DISPLAY_VALUE, input)
            break

          case(input === '='):
            this.$store.dispatch(types.ACTION_CALCULATE_RESULT)
            break

          default:
            Events.hub.$emit(Events.SHOW_ERROR_MESSAGE, "unsupported operator")
        }
      },
      unShiftInputToHistory(input) {
        this.$store.dispatch(types.ACTION_INSERT_INPUT_HISTORY, input)
      },
      keyMonitor: function (event) {
event.preventDefault()
        let pressedKey = event.key
        switch (true) {
          case  (pressedKey === 'Enter'):
            this.$store.dispatch(types.ACTION_CALCULATE_RESULT)
            break

          default:
            this.handleInput(pressedKey)
        }
      },


    }
  }
</script>

<style scoped>
  .inputBar {
    font-size: 40px;
    text-align: right;
  }

  .calculatorBoard {
    border: 8px solid #5e4c65;
    background-color: #b0dcff;
    padding: 10px;
    border-radius: 10px;
  }

  .mainPage {
    background-image: url("../assets/background.jpg");
    /* Full height */
    height: 100%;
    font-family: Lcdd;
    background-size: cover;
  }

</style>
