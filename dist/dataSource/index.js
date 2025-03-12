"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAPI = void 0;
const datasource_rest_1 = require("@apollo/datasource-rest");
class BaseAPI extends datasource_rest_1.RESTDataSource {
    token;
    constructor(options, token) {
        super(options);
        this.token = token || "";
    }
    willSendRequest(_path, request) {
        request.headers["authorization"] = `Bearer ${this.token}`;
    }
    didEncounterError(_error) { }
    handleError(error) {
        return {
            status: false,
            message: error.extensions.response.body?.message || "unexpected error occured",
        };
    }
}
exports.BaseAPI = BaseAPI;
