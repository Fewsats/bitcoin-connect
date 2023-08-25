import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {LwcElement} from './lwc-element';
import './lwc-connector-list.js';
import {withTwind} from './twind/withTwind';
import store from '../state/store';
import {loadingIcon2} from './icons/loadingIcon';
import {exitIcon} from './icons/exitIcon';
import {color} from './utils/colors';

@customElement('lwc-modal-content')
export class LwcModalContent extends withTwind(LwcElement) {
  override render() {
    return html`<div
      part="modal-content"
      class="flex flex-col justify-center items-center w-full"
    >
      ${this._connecting
        ? html`<div class="py-32">${loadingIcon2}</div>`
        : this._connected
        ? html` <h1 class="font-sans text-lg my-8" style="color: ${color(
            'text-secondary'
          )}">
            Hello,
            <span
              class="font-bold"
              style="
          background: -webkit-linear-gradient(${color('primary')}, ${color(
            'secondary'
          )});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          "
            >
              ${this._alias || 'Anon'}
            </span>
          </h1>

          <span class="font-sans text-xs mb-2" style="color: ${color(
            'text-secondary'
          )}">Balance</span>

          <h2 class="font-sans text-2xl mb-12" style="color: ${color(
            'text-secondary'
          )}">
            <span
              class="font-bold font-mono text-4xl align-bottom"
              style="
          background: -webkit-linear-gradient(${color('primary')}, ${color(
            'secondary'
          )});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          "
            >${this._balance || 0}</span>&nbsp;sats
          </h2>

          <hr class="border border-neutral-200 w-full mb-4"></div>

          <span class="font-sans text-xs mb-4" style="color: ${color(
            'text-secondary'
          )}">Connected through ${this._connectorName}</span>

          <button
            @click=${this._handleDisconnect}
            class="relative mt-4 h-8 px-3 font-medium font-sans shadow rounded-lg flex gap-2 justify-center items-center"
          >
            <div
              class="absolute -z-10 top-0 left-0 w-full h-full border-2 border-solid border-transparent rounded-lg"
              style="
              background-image: linear-gradient(${color('bg-primary')}, ${color(
            'bg-primary'
          )}), linear-gradient(to bottom, ${color('primary')}, ${color(
            'secondary'
          )});
              background-origin: border-box;
              background-clip: content-box, border-box;"
            ></div>
            ${exitIcon}
            <span style="
            background: -webkit-linear-gradient(${color('primary')}, ${color(
            'secondary'
          )});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          ">Disconnect</span>
          </button>`
        : html`
            <h1
              class="font-sans my-8"
              style="color: ${color('text-secondary')}"
            >
              How would you like to connect?
            </h1>

            <lwc-connector-list />
          `}
    </div>`;
  }

  private _handleDisconnect() {
    store.getState().disconnect();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-modal-content': LwcModalContent;
  }
}
