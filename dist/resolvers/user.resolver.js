"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const utils_1 = require("../utils");
exports.userResolver = {
    Mutation: {
        logout: (_, { email }, { dataSources }) => {
            return dataSources.userAPI.logout(email);
        },
        updateUser: (_, args, { dataSources }) => {
            if (args?.password) {
                args.password = (0, utils_1.hashPass)(args.password);
            }
            return dataSources.userAPI.updateUser(args);
        },
    },
    Query: {
        allUsers: (__, { params }, { dataSources }) => {
            return dataSources.userAPI.allUsers(params);
        },
        loggedInUser: (__, args, { dataSources }) => {
            return dataSources.userAPI.loggedInUser();
        },
        allFriends: (__, _, { dataSources }) => {
            return dataSources.userAPI.getListOfFriends();
        },
    },
};
