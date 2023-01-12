export interface QueueInfo {
  handler(): Promise<any> | any;

  timeout: number;
  beforeTimeout: number;
}

export interface QueueOptions {
  fifo: boolean;
  timeout: number;
  timeArr: number[];
}

function handleOptions(options ?: Partial<QueueOptions>): QueueOptions {
  options = options || {};
  let timeArr = options.timeArr || [];
  timeArr = timeArr.length ? timeArr : [1, 3, 5, 10, 20];
  return { fifo: options.fifo || false, timeout: -1, timeArr };
}

export class Queue {
  private list: QueueInfo[];
  private opt: QueueOptions;
  private state?: NodeJS.Timeout;

  constructor(options?: Partial<QueueOptions>) {
    this.opt = handleOptions(options);
    this.list = [];
  }

  add(handler: () => any, timeout = 0, beforeTimeout = 0) {
    this.list[this.opt.fifo ? 'unshift' : 'push']({ handler, timeout, beforeTimeout });
    this.start();
  }

  private handleStart(timeout = 0) {
    if (!timeout) {
      this.start();
    } else {
      this.state = setTimeout(() => {
        this.state = undefined;
        this.start();
      }, timeout);
    }
  }

  private start() {
    if (this.state) {
      if (this.opt.timeout < 0) return false;
      clearTimeout(this.state);
    }
    if (!this.list) return false;
    const item = this.list.shift();
    if (item) {
      this.opt.timeout = -1;
      const { handler, beforeTimeout, timeout } = item;
      const handlerFunc = () => {
        const res = handler();
        if (res && res.finally) {
          res.finally(() => {
            this.handleStart(timeout);
          });
        } else {
          this.handleStart(timeout);
        }
      };
      if (!beforeTimeout) {
        handlerFunc();
      } else {
        this.state = setTimeout(() => {
          this.state = undefined;
          handlerFunc();
        }, beforeTimeout);
      }
    } else {
      const timeArr = this.opt.timeArr;
      this.opt.timeout = Math.min(timeArr.length - 1, this.opt.timeout + 1);
      this.state = setTimeout(this.start, timeArr[this.opt.timeout] * 1000);
    }
  }

  empty() {
    this.list = [];
    if (this.state) clearInterval(this.state);
  }
}
