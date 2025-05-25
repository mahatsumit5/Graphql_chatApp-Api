"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAPI = void 0;
const datasource_rest_1 = require("@apollo/datasource-rest");
class BaseAPI extends datasource_rest_1.RESTDataSource {
    token;
    user;
    constructor(options, user, token) {
        super(options);
        this.token = token || "";
        this.user = user;
    }
    getToken() {
        return this.token;
    }
    getUser() {
        return this.user;
    }
    handleError(error) {
        const emptyData = Array.isArray([]) ? [] : {};
        return {
            status: false,
            message: error.extensions?.response.body?.message || error.message,
            data: emptyData,
            count: 0,
        };
    }
}
exports.BaseAPI = BaseAPI;
