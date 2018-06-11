<template>

  <el-col :span="5" >
  <el-button
    type="info"
    plain
    size="medium"
  @click ='passInputToCalculator(value)'
  >{{label}}</el-button>
  </el-col>
</template>

<script>
import {passInputToCalculator} from "../../api/api-utils";

export default {
        name: "OperatorButton",
        props:["value","label"],
        methods:{
          passInputToCalculator
        }

    }
</script>

<style scoped>

</style>
