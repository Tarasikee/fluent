export interface IListItem {
    name: string;
    quantity: number;
    cost: number;
    _id: string;
}

export interface IOrder {
    order: number;
    list: IListItem[];
    user: string;
    _id: string;
    date: Date;
}
