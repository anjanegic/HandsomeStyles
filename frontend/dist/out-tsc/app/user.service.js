import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.uri = 'http://localhost:4000/users';
    }
    login(username, password) {
        const data = {
            username: username,
            password: password,
        };
        return this.http.post(`${this.uri}/login`, data);
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map