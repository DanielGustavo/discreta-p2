import './style.css';
import makeResizableInputs from './utils/makeResizableInputs';

import secondDegreeEqHelper from './math/SecondDegreeEqHelper'
import { TNegativeDeltaResponse, TPositiveDeltaResponse } from './math/TSecondDegreeEqHelper';

makeResizableInputs();

const equationForm: null | HTMLFormElement = document.querySelector('form');

if (equationForm) {
  equationForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const [a, b, c] = getIncognits(equationForm)

    clearEquations()
    if (equationForm.a.disabled) {
      toggleInputs(equationForm)
      return
    }

    const result = secondDegreeEqHelper.calculate(a || 1, b ?? 0, c ?? 0);

    if (result.delta >= 0) {
      addPositiveDeltaResponse(result as TPositiveDeltaResponse)
      toggleInputs(equationForm)
    } else {
      addNegativeDeltaResponse(result as TNegativeDeltaResponse)
      toggleInputs(equationForm)
    }

    updateInputs(equationForm, a, b, c);
  })
}

function getIncognits(equationForm: HTMLFormElement) {
  const { a: inputA, b: inputB, c: inputC } = equationForm;

  return [
    inputA.value,
    inputB.value,
    inputC.value
  ]
}

function updateInputs(equationForm: HTMLFormElement, a: number, b: number, c: number) {
  equationForm.a.value = a;
  equationForm.b.value = b;
  equationForm.c.value = c;
}

function toggleInputs(equationForm: HTMLFormElement) {
  equationForm.a.toggleAttribute('disabled');
  equationForm.b.toggleAttribute('disabled');
  equationForm.c.toggleAttribute('disabled');

  toggleClassName(equationForm.a, 'colorGreen');
  toggleClassName(equationForm.b, 'colorRed');
  toggleClassName(equationForm.c, 'colorBlue');
}

function toggleClassName(element: HTMLElement, className: string) {
  if (!element.classList.contains(className)) {
    element.classList.add(className)
  } else {
    element.classList.remove(className)
  }
}

function clearEquations() {
  const equationsContainer = document.querySelector('#equationsContainer');
  const equations = document.querySelectorAll(".equation");

  if (!equationsContainer) return

  equations.forEach((equation, index) => {
    if (index > 0) {
      equation.remove();
    }
  });

  const buttonHTML = `
    <button type="submit" id="ctaButton">Calcular</button>
  `;

  equationsContainer.querySelector('#ctaButton')?.remove();
  equationsContainer.innerHTML += buttonHTML;
}

function addPositiveDeltaResponse(response: TPositiveDeltaResponse) {
  const equationsContainer = document.querySelector('#equationsContainer');

  if (!equationsContainer) return

  const responseHTML = `
    <div class="equation">
      <div class="incognitContainer">
        <div class="incognit"><span class="colorGreen">${response.a}</span>λ<span class="small expoent">2</span></div>
      </div>

      <span class="colorRed">${Math.sign(response.b) > 0 ? '+' : '-'}</span>

      <div class="incognitContainer">
        <div class="incognit"><span class="colorRed">${Math.abs(response.b)}</span>λ</div>
      </div>

      <span class="colorBlue">${Math.sign(response.c) > 0 ? '+' : '-'}</span>
       
      <div class="incognitContainer colorBlue">
        <div class="incognit">${Math.abs(response.c)}</div>
      </div>
       
      <span>=</span>
       
      <span>0</span>
    </div>

    <div class="equation equationResponse">
      <div class="incognitContainer">
        <div class="incognit">X<span class="small">n</span></div>
      </div>

      <span>=</span>

      <div class="incognitContainer">
        <div class="incognit">C<span class="small">1</span></div>
        <div class="incognit">(${response.lambdas[0].toFixed(2)})<span class="small expoent">n</span></div>
      </div>

      <span>+</span>
       
      <div class="incognitContainer">
        <div class="incognit">C<span class="small">2</span></div>
        <div class="incognit">(${response.lambdas[1].toFixed(2)})<span class="small expoent">n</span></div>
      </div>
    </div>

    <div class="equation equationDelta">
      <div class="incognitContainer">
        <div class="incognit">Δ</div>
      </div>

      <span>=</span>

      <div class="incognitContainer">
        <div class="incognit">${response.delta.toFixed(2)}</div>
      </div>
    </div>
     
    <button type="submit" id="ctaButton" class="bgRed">Limpar</button>
  `;

  equationsContainer.querySelector('#ctaButton')?.remove();
  equationsContainer.innerHTML += responseHTML;
}

function addNegativeDeltaResponse(response: TNegativeDeltaResponse) {
  const equationsContainer = document.querySelector('#equationsContainer');

  if (!equationsContainer) return

  const responseHTML = `
    <div class="equation">
      <div class="incognitContainer">
        <div class="incognit"><span class="colorGreen">${response.a}</span>λ<span class="small expoent">2</span></div>
      </div>

      <span class="colorRed">${Math.sign(response.b) > 0 ? '+' : '-'}</span>

      <div class="incognitContainer">
        <div class="incognit"><span class="colorRed">${Math.abs(response.b)}</span>λ</div>
      </div>

      <span class="colorBlue">${Math.sign(response.c) > 0 ? '+' : '-'}</span>
       
      <div class="incognitContainer">
        <div class="incognit colorBlue">${Math.abs(response.c)}</div>
      </div>
       
      <span>=</span>
       
      <span>0</span>
    </div>

    <div class="equation equationResponse">
      <div class="incognitContainer">
        <div class="incognit">X<span class="small">n</span></div>
      </div>

      <span>=</span>

      <div class="incognitContainer">
        <div class="incognit">${response.p.toFixed(2)}<span class="small expoent">n</span></div>
      </div>

      <div class="incognitContainer">
        <div class="incognit">(
          K<span class="small">1</span>cos(n${response.angle.toFixed(2)}) + 
          K<span class="small">2</span>sen(n${response.angle.toFixed(2)}))
        </div>
      </div>
    </div>
     
    <div class="equation equationDelta">
      <div class="incognitContainer">
        <div class="incognit">Δ</div>
      </div>

      <span>=</span>

      <div class="incognitContainer">
        <div class="incognit">${response.delta.toFixed(2)}</div>
      </div>
    </div>
     
    <button type="submit" id="ctaButton" class="bgRed">Limpar</button>
  `;

  equationsContainer.querySelector('#ctaButton')?.remove();
  equationsContainer.innerHTML += responseHTML;
}
