export class TaskModelDto{

    constructor(
        public id: number,
        public name: string,
        public description: string,
        public url: string,
        public cronFormat: string,
        public header: string){ }
}