export async function* MergeSort(
  array,
  combine,
  highlight,
  markSort,
  setCurrentLine,
  setI,
  setJ,
  offSet = 0,
  finalMerge = true,

) {
     if (array.length === 1) {
    if (finalMerge) markSort(0);
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  const arr = yield* await merge(
    yield* await MergeSort(
      left,
      combine,
      highlight,
      markSort,
      setCurrentLine,
      setI,
      setJ,
      offSet,
      false,
      
    ),
    yield* await MergeSort(
      right,
      combine,
      highlight,
      markSort,
      setCurrentLine,
      setI,
      setJ,
      offSet + middle,
      false,
     
    ),
    offSet,
    offSet + middle,
    finalMerge,
    markSort,
    setCurrentLine,
    setI,
    setJ 
  );
  return arr;

  async function* merge(
    left,
    right,
    off1,
    off2,
    finalMerge = false,
    markSort,
    setCurrentLine,
    setI,
    setJ 
  ) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    setI(leftIndex);
    setJ(rightIndex);
   //to highlight first line " let result = []; let i = 0;  let j = 0;",
   setCurrentLine(1);
   yield await highlight([off1 + leftIndex + rightIndex, off2 + rightIndex]);
   
   //To highlight while loop
   setCurrentLine(2);
   yield await highlight([off1 + leftIndex + rightIndex, off2 + rightIndex]);
    while (leftIndex < left.length && rightIndex < right.length) {
      
      //to highlight if condition
      setCurrentLine(3);
      yield await highlight([off1 + leftIndex + rightIndex, off2 + rightIndex]);
      if (left[leftIndex] <= right[rightIndex]) {
        //to highlight "line in which result is true"
        setCurrentLine(4);
        yield await highlight([off1 + leftIndex + rightIndex, off2 + rightIndex]);
        yield await combine(off1 + leftIndex + rightIndex, off1 + result.length);
        if (finalMerge) yield await markSort(off1 + result.length);
        result.push(left[leftIndex]);
        leftIndex++;
        setI(leftIndex);
      } 
      
      else {
        //To highlight else line
        setCurrentLine(5);
         yield await highlight([off1 + leftIndex + rightIndex, off2 + rightIndex]);

         //to highlight code inside else
         setCurrentLine(6);
        yield await highlight([off1 + leftIndex + rightIndex, off2 + rightIndex]);
        yield await combine(off2 + rightIndex, off1 + result.length);
        if (finalMerge) yield await markSort(off1 + result.length);
        result.push(right[rightIndex]);
        rightIndex++;
        setJ(rightIndex);
      }
    }
  
    //To highlight line while(i<array.length)
    setCurrentLine(9);
    yield await highlight([off1 + leftIndex + rightIndex]);

    while (leftIndex < left.length) {
      //To highlight "result.push(arr1[i]); i++;","
      
    
      setCurrentLine(10);
      if (finalMerge) yield await markSort(off1 + leftIndex + rightIndex);
      result.push(left[leftIndex]);
      leftIndex++;
      setI(leftIndex);
      
    }

    //To highlight line while (j<array.length)
    setCurrentLine(12);
    yield await highlight([off1 + leftIndex + rightIndex]);
    while (rightIndex < right.length) {
      
      //To highlight  " result.push(arr2[j]);j++;",
      setCurrentLine(13);
      yield await highlight([off1 + leftIndex + rightIndex]);
      if (finalMerge) yield await markSort(off1 + leftIndex + rightIndex);
      result.push(right[rightIndex]);
      rightIndex++;
      setJ(rightIndex);
    }

    return result;
  }
}

