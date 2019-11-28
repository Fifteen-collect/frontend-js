import {Size} from "../../Types/Block/ColorScheme";
import {PersonalBestInterface} from "../../Interfaces/PersonalBestInterface";

export default class PersonalBestService {
    public static getStats(size: Size): PersonalBestInterface | null {
        return JSON.parse(
            localStorage.getItem(
                size.toString(10)
            )
        );
    }

    public static saveStats(size: Size, stats: PersonalBestInterface): boolean {
        try {
            localStorage.setItem(
                size.toString(10),
                JSON.stringify(stats)
            );
        } catch (e) {
            console.error(e);

            return false;
        }

        return true;
    }
}
