export class User{
    constructor(
        public _id:string,
        public mobile: string,
        public email: string,
        public name: string,
        public username: string,
        public password: string,
        public photo:string,
        public privacity: string,
        public description: string
    
    ){}
}