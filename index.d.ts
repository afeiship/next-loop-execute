type LoopOptions = {
  interval?: number;
  timeout?: number;
  interrupt?: ({ count: number, data: any }) => boolean;
  done?: ({ count: number, data: any }) => boolean;
  callback: ({ count: number }) => Promise<any>;
};

interface NxStatic {
  loopExecute(options: LoopOptions): Promise<{ count: number }>;
}
