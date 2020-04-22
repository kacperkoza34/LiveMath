export const FETCHING_START = '[fetching] START';
export const FETCHING_STOP = '[fetching] STOP';

export const smallLoadingStart = () =>({
  type: FETCHING_START
});

export const smallLoadingStop = () =>({
  type: FETCHING_STOP
});
