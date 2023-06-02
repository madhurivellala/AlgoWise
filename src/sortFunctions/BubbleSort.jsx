export async function* BubbleSort(array, swap, highlight, marksort, setI, setJ,setCurrentLine) {

  for (let i = 0; i < array.length; i++) {
    setI(i);
    setCurrentLine(0);


    for (var j = 0; j < array.length - i - 1; j++) {
      setCurrentLine(1);  
      setJ(j);
      yield await highlight([j, j + 1]);
      setCurrentLine(2);
      yield await highlight([j, j + 1]);
      if (array[j] > array[j + 1]) {
        setCurrentLine(3);
      
        yield await swap(j, j + 1);
      }
    }
   
    marksort(j);
    yield;
    setCurrentLine(0);
    yield await highlight([j,j+1]);
    
  }
  
}
