"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const graphql_1 = require("graphql");
exports.userResolvers = {
    Mutation: {
        signUp: (parent, { input }, { dataSources }) => {
            if (!input?.email || !input.password) {
                throw new graphql_1.GraphQLError("Email and password are required");
            }
            return dataSources.userAPI.signUp(input);
        },
        signIn: (parent, { input }, { dataSources }) => {
            return dataSources.userAPI.signIn(input);
        },
        logout: (_, __, { dataSources }) => {
            return dataSources.userAPI.logout();
        },
        resetPassword: (_, { newPassword }, { dataSources }) => {
            return dataSources.userAPI.resetPassword(newPassword);
        },
        newJwt: (_, __, { dataSources }) => {
            return dataSources.userAPI.newJwt();
        },
        updateUser: (_, __, { dataSources }) => {
            return dataSources.userAPI.updateUser();
        },
        uploadProfile: () => {
            return {
                status: true,
                message: "Todo complete this functino",
            };
        },
    },
    Query: {
        allUsers: (__, { params }, { dataSources }) => {
            return dataSources.userAPI.allUsers(params);
        },
        loggedInUser: (__, args, { dataSources }) => {
            return dataSources.userAPI.loggedInUser();
        },
    },
};
