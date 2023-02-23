import { User } from './../entity/User';
import axios from 'axios';
import { UserResponse, UserFactory } from '../factory/UserFactory';

interface UserRequestParams {
  town_name: string;
}

export class UserRepository {
  async create({ townName }: User) {
    const params: UserRequestParams = {
      town_name: townName,
    };
    const res = await axios.post<UserResponse>('http://127.0.0.1:3001/users', params);
    return UserFactory.storageFromResponse(res.data);
  }

  // async update({
  //   townName,
  // }: User) {
  //   const params: UserRequestParams = {
  //     townName
  //   }
  //   const res = await
  // }
}
