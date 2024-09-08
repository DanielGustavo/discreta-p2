export default function makeResizableInputs() {
  const inputWrappers = document.querySelectorAll(".inputWrapper");

  inputWrappers.forEach((inputWrapper) => {
    const widthMachine: HTMLDivElement | null = inputWrapper.querySelector('.widthMachine');
    const input = inputWrapper.querySelector('input');

    if (!widthMachine || !input) return;

    input.addEventListener('keyup', () => {
      widthMachine.innerText = input.value;
    });
  });
}