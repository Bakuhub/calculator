<template>
<calculator></calculator>
</template>

<script>
  import OperatorButton from "./Dialog/OperatorButton"
  import Calculator from "./Calculator"
  import * as Events from "../foundation/event-hub"

  export default {
    name: 'Main',
    components: {Calculator, OperatorButton},
    data() {
      return {}
    },
    created: function () {
      Events.hub.$on(Events.SHOW_SUCCESS_MESSAGE, msg => this.showSuccessMessage(msg))
      Events.hub.$on(Events.SHOW_ERROR_MESSAGE, msg => this.showErrorMessage(msg))
    }
    , methods: {
      showErrorMessage(msg) {
        this.$message.error(msg)
      },
      showSuccessMessage(msg) {
        this.$message.success(msg)
      }
    }
  }
</script>
<style>


</style>
