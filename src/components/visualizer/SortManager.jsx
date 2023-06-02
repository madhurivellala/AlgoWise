import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ArrayContainer } from "./ArrayContainer";
import { MergeContainer } from "./MergeContainer";
import { InfoFooter } from "./InfoFooter";
import { Timer } from "./Timer";

import Card from "@material-ui/core/Card";
import { delay } from "../../common/helper";
import shallow from "zustand/shallow";
import { useControls, useData } from "../../common/store";

import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import { Pivot } from "../../sortFunctions/QuickSort";
import {Left,Right,Max} from  "../../sortFunctions/HeapSort";
let compareTime = useControls.getState().compareTime;
let swapTime = useControls.getState().swapTime;

useControls.subscribe(
  ([cTime, sTime]) => {
    compareTime = cTime;
    swapTime = sTime;
  },
  (state) => [state.compareTime, state.swapTime],
  shallow
);

const Container = styled(Card)`
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
`;

const AlgoHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
`;

const TimerDiv = styled.div`
  display: flex;
  column-gap: 5px;
  min-width: 8rem;
  justify-content: flex-end;
`;

export const SortManager = React.memo(function ({
  array,
  sortFunction,
  sortingAlgorithmName,
 
 
}) 
{
  const [swapIndices, setSwapIndices] = useState([-1, -1]);
  const [hightlightedIndices, setHightlightedIndices] = useState([-1, -1]);
  let [currentLine, setCurrentLine] = useState(0);
  const [maximumValue, setMaximumValue] = useState(null);
  const[keyIndex,setKeyIndex]=useState(null);

  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  

  const algoArray = useRef([]);
  const sortedIndices = useRef([]);
  const pivot = useRef(-1);
  const swapCount = useRef(0);
  const comparisionCount = useRef(0);
  const isAlgoExecutionOver = useRef(false);
  const isComponentUnMounted = useRef(false);
  
  const markSortngDone = useControls((state) => state.markSortngDone);
  const progress = useRef("");
  const sortProgressIterator = useRef(null,setI,setJ);
  const iteration=useRef(0)
  async function reset() {
    algoArray.current = [...useData.getState().sortingArray];
    sortedIndices.current = [];
    pivot.current = -1;
    swapCount.current = 0;
    comparisionCount.current = 0;
    isAlgoExecutionOver.current = false;
    setSwapIndices([-1, -1]);
    setHightlightedIndices([-1, -1]);
    setI(0);
    setJ(0);
    setCurrentLine(0);
    setMaximumValue(null);
    setKeyIndex(null);
    sortProgressIterator.current =
      sortingAlgorithmName === "MergeSort"
        ? await sortFunction(algoArray.current, combine, highlight, markSort,setCurrentLine,setI,setJ)
        :sortingAlgorithmName==="SelectionSort"
        ? await sortFunction(algoArray.current, swap, highlight, markSort,setI,setJ,setCurrentLine,setMaximumValue)
         :sortingAlgorithmName==="QuickSort"
         ? await sortFunction(algoArray.current, swap, highlight, markSort,0,array.length-1,setI,setJ,setCurrentLine)
        :sortingAlgorithmName=="HeapSort"
        ? await sortFunction(algoArray.current, swap, highlight, markSort,setI,setJ,setCurrentLine)
        :sortingAlgorithmName=="InsertionSort"
        ? await sortFunction(algoArray.current, swap, highlight, markSort,setI,setJ,setCurrentLine,setKeyIndex)
       : sortFunction(algoArray.current, swap, highlight, markSort,setI,setJ,setCurrentLine);
  }
 
 
 
  let codeLines = [];

  if (sortingAlgorithmName === "SelectionSort") {
    codeLines = [    "for (let i = 0; i < array.length - 1; i++) {",    "  let maxIndex = i;",    "  for (let j = i ; j < array.length; j++) {",    "    if (array[j] > array[maxIndex]) {",    "      maxIndex = j;",    "    }",    "  }",    "  swap(array[i], array[maxIndex]);",    "}",  ];
  } else if (sortingAlgorithmName === "InsertionSort") {
    codeLines = [    " for ( let i = 0; i < array.length; i++) {","  let keyIndex = i",    "  for (var j = i - 1; j >= 0; j--) {",    "    if (array[j] > array[keyIndex]) {",    "      swap(array[j], array[keyIndex])  and keyIndex = j; ",        "    }",    "  }",    "}",      ];
    
  } else if (sortingAlgorithmName === "BubbleSort") {
    codeLines = [    "for (let i = 0; i < array.length; i++) {",    "  for (let j = 0; j < array.length - i - 1; j++) {",    "    if (array[j] > array[j + 1]) {",    "      swap(array[j], array[j + 1]);",    "    }",    "  }",    "}",  ];
  }
  else if(sortingAlgorithmName === "QuickSort"){
    codeLines = [
      "function partition(low, high) {",
      "  const pivot = array[low];",
      "  let i = low - 1;",
      "  let j = high + 1;",
      "  while (i < j) {",
      "   while (--j > low) {",
      "      if (array[j] < array[pivot]) {",
      "           break;",
      "        }",
      "    }",
      "   while (i <= high && i < j) {",
      "     if (array[++i] > array[pivot]) {",
      "         break;",
      "       }",
      "    }",

      "    if (i < j) {",
      "      swap(array[i], array[j])",
      "    }",
      "    if (pivot !== j) {",
      "        swap(array[pivot], array[j]);",
      "    }",
      " }",
      ];
    

  }
  else if(sortingAlgorithmName === "MergeSort"){
    codeLines=["async function merge(arr1, arr2) {",
    " let result = []; let i = 0;  let j = 0;",
    "while (i < arr1.length && j < arr2.length) {",
    " if (arr1[i] <= arr2[j]) {",
    " result.push(arr1[i]); i++;",
    " } else {",
    " result.push(arr2[j]);j++;",
    " }",
    " }",
    " while (i < arr1.length) {",
    " result.push(arr1[i]); i++;",
    " }",
    " while (j < arr2.length) {",
    " result.push(arr2[j]);j++;",
    " }",
   " return result;",
    "}"]
  }
  else if (sortingAlgorithmName === "HeapSort") {
    codeLines = [    "function HeapSort(array){",    "  let arrLength = array.length;",    "  for (let i = Math.floor(arrLength / 2) - 1; i >= 0; i--) {" ,    "    maxHeap(i);","  }",    "  for (let i = array.length - 1; i > 0; i--) {",    "    arrLength--;",    "    swap(array[0], array[i]);",    "    maxHeap(0);",    "  }",    "}",    "function maxHeap(i) {",    "  const left = 2 * i + 1;",     "  const right = 2 * i + 2;",    "  let max = i;",    "  if(left < arrLength && array[left] > array[max] ){",
    "    max = left; ",     
  "  }",    
  "  if(right < arrayLength && array[right] > array[max]){",
  "    max = right;",     
  "  }", 
    "  if (max !== i) {",    "    swap(array[i], array[max]);",    "    maxHeap(max);","}","}"]}
   let highlightedCode = highlightCode(codeLines,currentLine);
   function highlightCode(codeLines, currentLine) {
    return codeLines.map((line, index) => {
      let style = {
        backgroundColor:
          (index === currentLine )
            ? "yellow"
            : "transparent",
      };
      
        return (
          <div key={index} style={style}>
            {line}
          </div>
        );
      
    });
  }
  
  
  


  
  
  


  useEffect(() => {
    progress.current = useControls.getState().progress;
    useControls.subscribe(
      (value) => {
        progress.current = value;
        
        if (progress.current === "start") runAlgo();
        if (progress.current === "reset") reset();
      },
      (state) => state.progress,
    );

    return () => {
      isComponentUnMounted.current = true;
    };
  }, []);

  useEffect(() => {
   
    reset();
  }, [array]);



  useEffect(() => {
    setI(i);
    setJ(j)
  }, [i,j]);
  

 

  async function runAlgo() {
    
    let completion = { done: false };
    
    while (
      !completion?.done &&
      progress.current === "start" &&
      !isComponentUnMounted.current
    ) {
      
      
      completion = await sortProgressIterator.current?.next();
    }

    if (isComponentUnMounted.current) {
      return;
    }

    if (!isAlgoExecutionOver.current && completion?.done) {
      setCurrentLine(0);
      isAlgoExecutionOver.current = true;
      pivot.current = -1;
      setSwapIndices([-1, -1]);
      setHightlightedIndices([-1, -1]);
      setI(0);
      setJ(0);
      markSortngDone();
    }
  }
  
  

  async function swap(i, j) {
    let tmp = algoArray.current[i];
    algoArray.current[i] = algoArray.current[j];
    algoArray.current[j] = tmp;
    setSwapIndices([i, j]);
    
    pivot.current = -1;
    swapCount.current += 1;
    await delay(swapTime);
  }

  async function combine(source, destination) {
    if (source !== destination) {
      swapCount.current += 1;
      setHightlightedIndices([-1, -1]);
      setSwapIndices([source, destination]);
      await delay(swapTime);
    }
  }

  async function highlight(indices, p) {
    setSwapIndices([-1, -1]);
    comparisionCount.current += 1;
    pivot.current = p;
    setHightlightedIndices(indices);
    await delay(compareTime);
    
   
  }
  
  function markSort(...indices) {
    sortedIndices.current.push(...indices);
  }

  
  const mergeContainer = (
    <MergeContainer
      array={algoArray.current}
      source={swapIndices[0]}
      destination={swapIndices[1]}
      hightlightedIndices={hightlightedIndices}
      sortedIndices={sortedIndices.current}
    />
  );
  const arrayContainer = (
    <ArrayContainer
      array={algoArray.current}
      source={swapIndices[0]}
      destination={swapIndices[1]}
      pivot={pivot.current}
      highlightIndices={hightlightedIndices}
      sortedIndices={sortedIndices.current}
      
    />
  );

  return (
    <Container>
      <AlgoHeaderBar>
        <strong>{sortingAlgorithmName}</strong>
        <TimerDiv>
          <span>Time:</span>
          <strong>
            <Timer
              isAlgoExecutionOver={isAlgoExecutionOver.current}
            />
          </strong>
        </TimerDiv>
      </AlgoHeaderBar>
      <pre>
     <code>
      {highlightedCode}
     </code>

</pre>
      {sortingAlgorithmName === "MergeSort" ? mergeContainer : arrayContainer}
      {sortingAlgorithmName === "SelectionSort" &&
       <>
       <div>
          Maximum element: {maximumValue}
        </div>
        <div>
        <p>i : {i}, j : {j} </p>
        
      </div></>
       
      
      }
       {sortingAlgorithmName === "InsertionSort" &&
        <div>

          keyIndex : {keyIndex}
          <div>
            <p>i : {i}, j : {j} </p>
        
          </div>
          </div>
        
      }

       {sortingAlgorithmName === "QuickSort" &&
        <div>
          Pivot element : {Pivot}
          <p>i : {i}, j : {j} </p>
          
        </div>
      }
      {sortingAlgorithmName === "BubbleSort" &&
        <div>
         
          <p>i : {i}, j : {j} </p>
        </div>
      }
       {sortingAlgorithmName === "HeapSort" &&
        <div>
          <p>Left : {Left},  Right : {Right}, Max : {Max}, i : {i}, j : {j} </p>
        </div>
      }
       
      <InfoFooter
        swapCount={swapCount.current}
        comparisionCount={comparisionCount.current}
      ></InfoFooter>
    </Container>
  );
  
});
