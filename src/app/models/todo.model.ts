export class Todo {
    constructor(
        public title: string,
        public startDate: Date,
        public dueDate: Date,
        public isPublic: boolean,
        public category: string,
        public description: string,
        public status: string = 'pending',
        public id: string = '_' + Math.random().toString(36).substr(2, 9)
    ) { }
}