export function setRiveInput(rive, stateMachine, name, value) {
  const input = rive?.stateMachineInputs(stateMachine)?.find((item) => item.name === name);

  if (input) {
    input.value = value;
  }
}
