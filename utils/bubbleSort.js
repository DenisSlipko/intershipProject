export const bubbleSort = (array, key) => {
  let swapped;

  do {
    swapped = false;

    for (let i = 0; i < array.length - 1; i++) {
      if (array[i][key] > array[i + 1][key]) {
        let temp = array[i];

        array[i] = array[i + 1];
        array[i + 1] = temp;

        swapped = true;
      }
    }
  } while (swapped);
  return array;
};
