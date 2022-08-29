const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
//TODO: Not sure if I need this.
const { signToken } = require("../utils/auth.js");

//TODO: Build out resolvers logic.
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {

                const findUser = await User.findOne({ _id: context.user.id }).select("-password");
            
                return findUser;

            }
            
            throw new AuthenticationError("User is not logged in.");
        }
    },

    //TODO: Setup proper args and context for the ones that need it.
    // Mutation: {
    //     login: async (parent, { email, password }, context) => {
            
    //         //Find a user by the email argument passed in.
    //         const user = await User.findOne({ email });

    //         //Check if user exists.
    //         if (!user) {
    //             //TODO: Add logic here.
    //         }

    //     },

    //     addUser: async (parent, args, context) => {

    //         //Create a new user with the user info passed in from arguments.
    //         const newUser = await User.create(args); 

    //         return {user};

    //     },

    //     removeBook: async (parent, args, context) => {

    //     },

    //     saveBook: async (parent, args, context) => {

    //     }
    // }
}

module.exports = resolvers;