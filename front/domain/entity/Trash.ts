export enum TrashName {
	Clothes = 'clothes',
	Plastic = 'plastic',
	Burnable = 'burnable',
	BottolesAndOil = 'bottles_and_oil',
	Unburnable= 'unburnable',
	Paper = 'paper',
	Nothing = 'nothing',
}

export class Trash {
	constructor(
    public id: number | undefined,
    public name: TrashName,
    public regionId: number,
    public date: Date,
  ) {}
}
