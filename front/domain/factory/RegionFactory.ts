import AsyncStorage from '@react-native-async-storage/async-storage';
import { Region } from '../entity/Region';

export interface RegionResponse {
  name: number;
  town_name: string;
}

export class RegionFactory {
  static storageFromResponse(res: RegionResponse) {
    AsyncStorage.multiSet([['regionId', String(res.name)], ['townName', String(res.town_name)]]);
    return new Region(res.name, res.town_name);
  }
}
