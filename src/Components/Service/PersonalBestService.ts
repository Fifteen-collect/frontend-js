import {Size} from "Types/Block/Size";
import {IPersonalBestInterface} from "Interfaces/IPersonalBestInterface";

export default class PersonalBestService {
  public static getStats(size: Size): IPersonalBestInterface | null {
    return JSON.parse(
      localStorage.getItem(
        size.toString(10)
      )
    );
  }

  public static saveStats(size: Size, stats: IPersonalBestInterface): boolean {
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
