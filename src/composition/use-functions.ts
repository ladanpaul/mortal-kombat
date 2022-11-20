export function useFunctions() {
  function chunkArray<T>(arr: T[][], size: number): Array<T[][]> {
    return arr.length > size
      ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
      : [arr];
  }

  return {
    chunkArray,
  };
}
