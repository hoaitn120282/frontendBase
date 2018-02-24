class Route {
    constructor(prefix = '') {
        this.prefix = prefix;
    }
    setPrefix(prefix) {
        this.prefix = prefix;
    }

    get login() {
        return `/login`;
    }

    get account() {
        return '/account';
    }

    get dashboard() {
        return '/dashboard';
    }
}

export default new Route();
