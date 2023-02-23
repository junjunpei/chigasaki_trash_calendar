import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../entity/User';

export interface UserResponse {
  id: number;
  town_name: string;
  region_id: number;
}

export class UserFactory {
  static storageFromResponse(res: UserResponse) {
    AsyncStorage.setItem('region', String(res.region_id));
    return new User(res.id, res.town_name, res.region_id);
  }
}
