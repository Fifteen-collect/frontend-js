import {Size} from "Types/Block/Size";
import {StatCounts} from "Types/StatCounts";

const STATS_COUNT_KEY = 'counts';

export function getStatCounts(): StatCounts | null {
    return <StatCounts>JSON.parse(localStorage.getItem(STATS_COUNT_KEY));
}

export function incrementStat(size: Size): void {
    let counts: {[p: number]: number} = getStatCounts();

    if (!counts) {
        counts = {};

        for (const size in Size) {
            counts[size] = 0;
        }
    }

    if (!counts[size]) {
        counts[size] = 0;
    }

    counts[size]++;

    localStorage.removeItem(STATS_COUNT_KEY);
    localStorage.setItem(STATS_COUNT_KEY, JSON.stringify(counts));
}
