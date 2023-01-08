import { defineStore } from 'pinia';
import UseCursorBind from './tools';

export interface State {
  top: number;
  left: number;
  hide: boolean;
  hasDown: boolean;
  bindState?: UseCursorBind;
}

export const useCursorName = 'useCursorName';

export const useCursorStore = defineStore(useCursorName, {
  state: (): State => ({ top: -100, left: -100, hide: false, hasDown: false }),
  getters: {
    getState: ({ bindState }) => !!bindState,
    getData: ({ top, left, hide, hasDown }) => ({ top, left, hide, hasDown }),
  },
  actions: {
    bind(element?: HTMLElement) {
      if (this.bindState) this.clear();
      this.bindState = new UseCursorBind(element || window.document);
      this.bindState.on<number>('move', (x, y) => {
        this.top = y;
        this.left = x;
      });
      this.bindState.on<boolean>('hasHide', state => this.hide = state);
      this.bindState.on<boolean>('hasDown', state => this.hasDown = state);
    },
    clear() {
      if (this.bindState) {
        this.bindState.clear();
        this.bindState = undefined;
      }
    },
  },
});

export default useCursorStore;
