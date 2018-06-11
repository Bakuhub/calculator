import * as Events from '../foundation/event-hub'



export function passInputToCalculator(input) {
  Events.hub.$emit(Events.PASS_INPUT_TO_CALCULATOR,input)

}
