let Left;
let Right;
let Max;

export async function* HeapSort(array, swap, highlight, markSort,setI,setJ, setCurrentLine) {
  let arrLength = array.length;
  setCurrentLine(15)
  for (let j = Math.floor(arrLength / 2) - 1; j >= 0; j--) {
    setJ(j);
    yield* await maxHeap(j);
  }

  for (let i = array.length - 1; i > 0; i--) {
    setI(i);
    arrLength--;
    markSort(arrLength);
    setCurrentLine(7);
    
    yield await swap(0, i);
    setTimeout(() => {
      console.log("delay");
    }, 3000);
    yield* await maxHeap(0);
  }

  markSort(0);

  async function* maxHeap(i) {
    
    const left = 2 * i + 1;
    Left=left;
    

    const right = 2 * i + 2;
    Right=right;
    let max = i;
    Max=max;

    const highlightArray = [];
    if(left < arrLength)
      highlightArray.push(left);
    if(right < arrLength)
      highlightArray.push(right);
    yield await highlight(highlightArray, i);
    
    
    setCurrentLine(15);
    yield await highlight(highlightArray, i);
    
    if(left < arrLength){
    
      
      if (array[left] > array[max]) {
        
          setCurrentLine(16);
          yield await highlight(highlightArray, i);
        
        max = left;
        Max=max;
      }
    }
    
      setCurrentLine(18);
      yield await highlight(highlightArray, i);
    
    if(right < arrLength){
      if (array[right] > array[max]) {
        
          setCurrentLine(19);
          yield await highlight(highlightArray, i);
        max = right;
        Max=right;
      }
    }

    if (max !== i) {
      setCurrentLine(22);
      yield await swap(i, max);
      
      yield* await maxHeap(max);
    }
  }
}
export{Left,Right,Max};