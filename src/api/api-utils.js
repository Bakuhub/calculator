import * as Events from '../foundation/event-hub'



export function passInputToCalculator(input) {
  const isFromInputHistory = (input.value)
  Events.hub.$emit(Events.PASS_INPUT_TO_CALCULATOR,isFromInputHistory?input.value:input)

}
