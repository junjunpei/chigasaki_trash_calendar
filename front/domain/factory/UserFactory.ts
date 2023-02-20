import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserResponse {
  region_id: number;
}

export class UserFactory {
  static storageFromResponse(res: UserResponse) {
    AsyncStorage.setItem('region', String(res.region_id))
  }
}