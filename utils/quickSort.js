export function quickSort(array, key) {
  if (array.length < 2) {
    return array;
  } else {
    const pivotPosition = Math.floor(Math.random() * array.length);
    const pivot = array[pivotPosition];
    const less = array.filter((value, index) => {
      const isPivot = index === pivotPosition;
      return !isPivot && value[key] <= pivot[key];
    });
    const more = array.filter((value) => value[key] > pivot[key]);
    return [...quickSort(less, key), pivot, ...quickSort(more, key)];
  }
}
