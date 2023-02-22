import { Component, Host, h } from '@stencil/core';

window.customElements.define('custom-button', class CustomButton extends HTMLButtonElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.setAttribute('custom-attribute', '');
  }
}, { extends: 'button' });

@Component({
  tag: 'stencil-bug',
  shadow: true,
})
export class StencilBug {

  render() {
    return (
      <Host>
        stencil buggy version:
        <button is="custom-button"><slot></slot></button>

        rendered by the browser (innerHTML):
        <div ref={ el => el.innerHTML = `<button is="custom-button">this has the custom attribute</button>` }></div>

        rendered using <code>createElement</code> with options argument:
        <div ref={ el => {
          const button = document.createElement('button', { is: 'custom-button' });
          button.textContent = 'this has the custom attribute, also';
          el.appendChild(button);
        }}></div>

      </Host>
    );
  }

}
