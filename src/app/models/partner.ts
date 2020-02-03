import { Optional } from '@angular/core';

export class Partner {

    active: boolean;
    id: string;
    name: String;
    orders: any[];
    _id?: string;

    constructor(name: string,
                @Optional() active?: boolean, 
                @Optional() id?: string, 
                @Optional() orders? : any[],
                @Optional() _id? : string,
                ){
        this.id = id;
        this.name = name;
        this.orders = orders;
        this.active = active;
        this._id = _id;

    }
}