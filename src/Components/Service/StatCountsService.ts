import {Size} from "../../Types/Block/Size";
import {StatCounts} from "../../Types/StatCounts";

const STATS_COUNT_KEY = 'counts';

export default class StatCountsService {
    public static getCounts() {
        return JSON.parse(localStorage.getItem(STATS_COUNT_KEY));
    }

    public static increment(size: Size) {
        let counts = this.getCounts();

        if (!counts) {
            counts = this.createDefaultStats();
        }

        counts[size]++;

        localStorage.removeItem(STATS_COUNT_KEY);
        localStorage.setItem(STATS_COUNT_KEY, JSON.stringify(counts));
    }

    protected static createDefaultStats(): StatCounts {
        let counts: {[p: number]: number} = {};

        for (const size in Size) {
            counts[size] = 0;
        }

        return <StatCounts>counts;
    }
}
