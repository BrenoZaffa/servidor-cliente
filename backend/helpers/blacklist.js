export class blacklist {
    constructor() {
        this.list = [];
    }

    add(ip) {
        this.list.push(ip);
    }

    isBlacklisted(ip) {
        return this.list.includes(ip);
    }
}