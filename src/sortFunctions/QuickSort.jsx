
let Pivot=null;
export async function* QuickSort(
  array,
  swap,
  highlight,
  markSort,
  low = 0,
  high = array.length - 1,
  setI,
  setJ,
  setCurrentLine,
  
) {
  if (low <= high) {
    let pivot = yield* await partition(array, low, high, setI, setJ, setCurrentLine);
    Pivot = array[pivot];
    yield* await QuickSort(array, swap, highlight, markSort, low, pivot - 1, setI, setJ, setCurrentLine);
    yield* await QuickSort(array, swap, highlight, markSort, pivot + 1, high, setI, setJ, setCurrentLine);
  }

  async function* partition(array, low, high, setI, setJ, setCurrentLine) {
    let pivot = low;
    Pivot = array[pivot];
    let i = low;
    let j = high + 1;
    setI(i);
    setJ(j);
    //Highlight const pivot = array[low];
    setCurrentLine(1);
    yield await highlight([i, j], pivot);
    //Highlight  let i = low - 1;
    setCurrentLine(2);
    yield await highlight([i, j], pivot);
    //Highlight  let j = high + 1;
    setCurrentLine(3);
    yield await highlight([i, j], pivot);
    //Highlight  while (i < j) {
      setCurrentLine(4);
      yield await highlight([i, j], pivot);
    while (i < j) {

      //Highlight while (--j > low) {
        setCurrentLine(5);
        yield await highlight([i, j], pivot);

     
      while (--j > low) {
        setJ(j);
         //Highlight  if (array[j] < array[pivot]) {
         
    
        setCurrentLine(6);
        yield await highlight([i, j], pivot);

         //Highlight  if (array[j] < array[pivot]) {
          
        if (array[j] < array[pivot]) {
          setCurrentLine(7);
          yield await highlight([i, j], pivot);
          break;
        }
      }
      //Highlight  while (i <= high && i < j) {
      setCurrentLine(10);
      yield await highlight([i], pivot);

      while (i <= high && i < j) {
        setI(i);
       //Highlight if (array[++i] > array[pivot]) {
        setCurrentLine(11);
        yield await highlight([i], pivot);
        if (array[++i] > array[pivot]) {
          setCurrentLine(12);
        yield await highlight([i], pivot);
          break;
        }
      }
      setCurrentLine(15);
      yield await highlight([i,j]);
      if (i < j) {
        setCurrentLine(16);
        yield await swap(i, j);
      }
    }
    setCurrentLine(18);
      yield await highlight([j],pivot);
    if (pivot !== j) {
      setCurrentLine(19);
      yield await swap(pivot, j);
    }

    markSort(j);
    yield;
    setCurrentLine(0);
    setI(null);
    setJ(null);
    return j;
  }
}

export { Pivot };
