import { User } from "../entity/User";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserResponse {
  id: number;
}

export class UserFactory {
  static createFromResponse(res: UserResponse): User {
    AsyncStorage.setItem('user', String(res.id))
    return new User(
      res.id
    )
  }
}