let maximumValue;
export async function* SelectionSort(array, swap, highlight, marksort,setI,setJ,setCurrentLine,setMaximumValue) {
  setCurrentLine(0);
  for (let i = 0; i < array.length; i++) {
    let maxIndex = 0;
    
    maximumValue=array[maxIndex];
    setMaximumValue(maximumValue);
    setCurrentLine(1);
    yield await highlight([maxIndex]);
  
    setI(i);
    for (var j = 0; j < array.length - i; j++) {
      setCurrentLine(2);
      yield await highlight([maxIndex]);
  
      setJ(j);
      setCurrentLine(3);
      yield await highlight([maxIndex, j]);
      
      if (array[maxIndex] < array[j]) {
       
        
        maxIndex = j;
        maximumValue = array[maxIndex];
        setCurrentLine(4);
        yield await highlight([maxIndex, j]);
        setMaximumValue(array[maxIndex]);
        
        
      }
     
    }
   
    j = j - 1;
    if (maxIndex !== j && array[maxIndex] !== array[j]) {
      setCurrentLine(7);
      yield await swap(maxIndex, j);
    }
    
   
    marksort(j);
    yield;
  }
  
}




