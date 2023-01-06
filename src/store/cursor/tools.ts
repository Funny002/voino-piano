type UseCursorBindFunc<T = any> = (...args: T[]) => void
type UseCursorBindKeys = 'move' | 'hasDown' | 'hasHide' | string

export class UseCursorBind {
  target: HTMLElement;
  onList: { [key: string]: UseCursorBindFunc[] };

  constructor(element: HTMLElement | Document, options?: UseCursorBind['onList']) {
    this.target = element as HTMLElement;
    this.onList = options || {};
    //
    this.target.addEventListener('mousemove', this.handleMove.bind(this));
    this.target.addEventListener('mouseup', this.handleHasDown.bind(this, false));
    this.target.addEventListener('mousedown', this.handleHasDown.bind(this, true));
    this.target.addEventListener('mouseover', this.handleHasHide.bind(this, false));
    this.target.addEventListener('mouseout', this.handleHasHide.bind(this, true));
  }

  private verifyKey(keys: string): boolean {
    return ['move', 'hasDown', 'hasHide'].includes(keys);
  }

  public on<T = any>(keys: UseCursorBindKeys, func: UseCursorBindFunc<T>): void {
    if (!this.verifyKey(keys)) throw new Error(`未知的 key: ${keys}`);
    if (!this.onList[keys]) this.onList[keys] = [];
    this.onList[keys].push(func);
  }

  public clear(): void {
    this.target.removeEventListener('mousemove', this.handleMove.bind(this));
    this.target.removeEventListener('mouseup', this.handleHasDown.bind(this, false));
    this.target.removeEventListener('mousedown', this.handleHasDown.bind(this, true));
    this.target.removeEventListener('mouseover', this.handleHasHide.bind(this, false));
    this.target.removeEventListener('mouseout', this.handleHasHide.bind(this, true));
  }

  private handleFuncRun(keys: string, ...args: any[]): void {
    if (this.onList[keys]) {
      for (const func of this.onList[keys]) {
        func(...args);
      }
    }
  }

  private handleHasDown(state: boolean, event: MouseEvent): void {
    event.preventDefault();
    this.handleFuncRun('hasDown', state);
  }

  private handleHasHide(state: boolean, event: MouseEvent): void {
    event.preventDefault();
    this.handleFuncRun('hasHide', state);
  }

  private handleMove(event: MouseEvent): void {
    event.preventDefault();
    const { clientX, clientY } = event;
    this.handleFuncRun('move', clientX, clientY);
  }
}

export default UseCursorBind;
