export const mergeState = (state, newState) => {
  const baseState = { ...state };

  Object.keys(newState).forEach(entityKey => {
    if (typeof (newState[entityKey]) === 'string') {
      baseState[entityKey] = newState[entityKey];
    } else {
      baseState[entityKey] = {
        ...baseState[entityKey],
        ...newState[entityKey]
      };
    }
  });

  return baseState;
};

export const pick = <O, K extends keyof O>(o: O, keys: [K]): Pick<O, K> => {
  const copy: any = {};
  keys.forEach(k => {
    copy[k] = o[k];
  });
  return copy;
};

export const composeFn = (...fns) =>
  fns.reverse().reduce((prevFn, nextFn) =>
    value => nextFn(prevFn(value)),
    value => value
  );
