import { Trash } from "../entity/Trash";

export interface TrashResponse {
  id: number;
  name: string;
  region_id: number;
  date: Date;
}

export class TrashFactory {
  static getFromResponse(res: TrashResponse) {
    return new Trash(
      res.id,
      res.name,
      res.region_id,
      res.date
    )
  }
}