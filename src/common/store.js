import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  sortingArray,
  compareTime,
  swapTime,
  sortingAlgorithms,
} from "./config";

export const useControls = create(
  devtools((set) => ({
    progress: "reset",
    speed: 3,
    compareTime: compareTime,
    swapTime: swapTime,
    doneCount: 0,

    startSorting: () => set({ progress: "start" }),
    pauseSorting: () => set({ progress: "pause" }),
    resetSorting: () => set({ progress: "reset", doneCount: 0 }),
    markSortngDone: () =>
      set((state) => {
        if (useData.getState().algorithm === sortingAlgorithms.length) {
          if (state.doneCount === sortingAlgorithms.length - 1)
            return { doneCount: 0, progress: "done" };
          else return { doneCount: state.doneCount + 1 };
        } else return { progress: "done" };
      }),
    setSpeed: (speed) =>
      set(() => {
        return { swapTime: 3000 / speed, compareTime: 1500 / speed, speed };
      }),
  }))
);

// The create function is used to create a new store with an initial state and a set of updater functions.
//  The devtools function is used to enable debugging and time-traveling capabilities for the store, which can be helpful for tracking 
// state changes and debugging errors.
export const useData = create(
  devtools((set) => ({
    algorithm: 0,
    sortingArray: sortingArray,
    highlightedLine: 0,


    setSortingArray: (array) => set({ sortingArray: array }),
    setAlgorithm: (idx) => set({ algorithm: idx }),
    setHighlightedLine: (line) => set({ highlightedLine: line }) 
    
  }))
);

