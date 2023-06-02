let Key =0;

export async function* InsertionSort(array, swap, highlight, marksort,setI,setJ,setCurrentLine,setKeyIndex) {
  
  for ( let i = 0; i < array.length; i++) {
    setCurrentLine(0);
    
    let keyIndex = i;
    yield await highlight([keyIndex, j]);
    Key=keyIndex;
    setKeyIndex(Key);
    setCurrentLine(1);
    yield await highlight([keyIndex, j]);
    
    setI(i);
    setJ(0);
    for (var j = i - 1; j >= 0; j--) {
      setJ(j);
      setCurrentLine(2);
      yield await highlight([keyIndex, j]);
      setCurrentLine(3);
      yield await highlight([keyIndex, j]);
        
      if (array[j] > array[keyIndex]) {
       
        setCurrentLine(4);
        yield await swap(j, keyIndex);
        keyIndex = j;
        Key=keyIndex;
        setKeyIndex(Key);
      } else {
        
        yield;
        break;
      }
      
    }

    marksort(i);
    yield;
  }
}
export {Key};