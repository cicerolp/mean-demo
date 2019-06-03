export class Item {
  constructor(public _id: string, public img: number, public name: string,
    public price: number = 0, public description: string = '', public rating: number = 5) {
  }
}
