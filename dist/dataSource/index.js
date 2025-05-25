import { RESTDataSource } from "@apollo/datasource-rest";
export class BaseAPI extends RESTDataSource {
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
