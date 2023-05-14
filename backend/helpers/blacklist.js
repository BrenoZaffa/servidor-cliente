export class blacklist {
    constructor() {
        this.blacklist = [];
    }

    add(ip) {
        this.blacklist.push(ip);
    }

    isBlacklisted(ip) {
        return this.blacklist.includes(ip);
    }
}