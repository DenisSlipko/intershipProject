export const quickSort = (array, key) => {
  if (array.length < 2) {
    return array;
  } else {
    const pivotPosition = Math.floor(array.length / 2);
    const pivot = array[pivotPosition];
    const less = array.filter((value, index) => {
      const isPivot = index === pivotPosition;
      return !isPivot && value[key] <= pivot[key];
    });
    const more = array.filter((value) => value[key] > pivot[key]);
    return [...quickSort(less, key), pivot, ...quickSort(more, key)];
  }
};
