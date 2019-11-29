import {Size} from "Types/Block/Size";
import {StatCounts} from "Types/StatCounts";

const STATS_COUNT_KEY = 'counts';

export function getStatCounts(): StatCounts | null {
    return <StatCounts>JSON.parse(localStorage.getItem(STATS_COUNT_KEY));
}

export function incrementStat(size: Size): void {
    let counts = getStatCounts();

    if (!counts) {
        let counts: {[p: number]: number} = {};

        for (const size in Size) {
            counts[size] = 0;
        }
    }

    counts[size]++;

    localStorage.removeItem(STATS_COUNT_KEY);
    localStorage.setItem(STATS_COUNT_KEY, JSON.stringify(counts));
}
