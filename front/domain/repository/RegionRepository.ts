import { Region } from '../entity/Region';
import axios from 'axios';
import { RegionResponse, RegionFactory } from '../factory/RegionFactory';

interface RegionRequestParams {
  town_name: string;
}

export class RegionRepository {
  async create({ townName }: Region) {
    const params: RegionRequestParams = {
      town_name: townName,
    };
    const res = await axios.post<RegionResponse>('http://127.0.0.1:3001/register_region', params);
    console.log(res);
    return RegionFactory.storageFromResponse(res.data);
  }


}
