import { Trash } from '../entity/Trash';
import { TrashFactory, TrashResponse } from '../factory/TrashFactory';
import axios from 'axios';

interface TrashRequestParams {
  region_id: number;
}

export class TrashRepository {
  async getTrashDates({ regionId }: Trash) {
    const params: TrashRequestParams = {
      region_id: regionId,
    };
    const res = await axios.get<TrashResponse[]>(
      `http://127.0.0.1:3001/get_trash_dates?region_id=${params.region_id}`,
    );
    return res.data.map((trash) => TrashFactory.getFromResponse(trash));
  }
}
