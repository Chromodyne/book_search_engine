const { User } = require("../models");
const { signToken } = require("../utils/auth.js");

//TODO: Build out resolvers logic.
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            const findUser = await User.findOne({ _id: context.user.id }).select("-password");
            
            return findUser;
        }
    },

    Mutation: {
        login: async (parent, args, context) => {

        },

        addUser: async (parent, args, context) => {

        },

        removeBook: async (parent, args, context) => {

        },

        saveBook: async (parent, args, context) => {

        }
    }
}

module.exports = resolvers;