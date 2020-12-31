import {Size} from "Types/Block/Size";
import {StatCounts} from "Types/StatCounts";

const SOLVED_COUNTS_KEY = 'counts';
const RESETS_COUNTS_KEY = 'resets';

function getStatCounts(type: string): StatCounts | null {
  return JSON.parse(localStorage.getItem(type)) as StatCounts;
}

function incrementStat(size: Size, types: string | string[]): void {
  if (!Array.isArray(types)) {
    types = [types];
  }

  types.forEach(type => {
    let counts: { [p: number]: number } = getStatCounts(type);

    if (!counts) {
      counts = {};

      for (const s in Size) {
        counts[s] = 0;
      }
    }

    if (!counts[size]) {
      counts[size] = 0;
    }

    counts[size]++;

    localStorage.removeItem(type);
    localStorage.setItem(type, JSON.stringify(counts));
  });
}

export {
  SOLVED_COUNTS_KEY,
  RESETS_COUNTS_KEY,
  getStatCounts,
  incrementStat,
}
