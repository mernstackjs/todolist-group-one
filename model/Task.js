export class Task {
    constructor(title, description, date, id = null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
    }
}