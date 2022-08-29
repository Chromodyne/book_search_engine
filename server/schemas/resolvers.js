const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

//TODO: Remember how to use tokens.
const { signToken } = require("../utils/auth.js");

//TODO: Build out resolvers logic.
const resolvers = {
    //Queries
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {

                const findUser = await User.findOne({ _id: context.user.id }).select("-password");
            
                return findUser;

            }
            
            throw new AuthenticationError("User is not logged in.");
        }
    },

    //Mutations
    Mutation: {
        login: async (parent, { email, password }, context) => {
            
            //Find a user by the email argument passed in.
            const user = await User.findOne({ email });

            //Check if user exists.
            if (!user) {
                throw new AuthenticationError("Incorrect username.");
            }

            //Get isCorrectPassword from User schema and check.
            const checkPW = await user.isCorrectPassword(password);
            
            //If password is incorrect, throw error.
            if (!checkPW) {
                throw new AuthenticationError("Incorrect password.");
            }

            //Create a token for the user.
            const token = signToken(user);

            return {token, user};

        },

        addUser: async (parent, args, context) => {

            //Create a new user with the user info passed in from arguments.
            //TODO: Should I create a token here as well?
            const newUser = await User.create(args); 

            return {newUser};

        },

        //Removes a book based on the id passed in the arguments.
        removeBook: async (parent, { bookId }, context) => {

            if (context.user) {

                //Dont forget the "new" parameter for findOneAndUpdate.
                const modified = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: {bookId}}},
                    { new: true}
                );

                return modified;

            } else {

                throw new AuthenticationError("Please log in first.");

            }

        },

        //Save a book.
        saveBook: async (parent, {data}, context) => {

            if (context.user) {
                //Note: findOneAndUpdate didn't seem to work here. Parameter issues I think.
                const modified = await user.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: data}},
                    { new: true },
                );

                return modified;

            } else {
                throw new AuthenticationError("Please log in first.");
            }

        }
    }
}

module.exports = resolvers;