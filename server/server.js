const express = require('express');
const path = require('path');

//Apollo and auth stuff.
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth.js");
const { typeDefs, resolvers } = require("./schemas");

//Database connection
const db = require('./config/connection');

//This will be removed when swapping to apollo/graphql.
//const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

//Apollo server configuration. Using the typedefs.js and resolvers.js files.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  //context: authMiddleware
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//This will be removed once we swap over to apollo/graphql.
//app.use(routes);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/'));
})


//Logic for starting the apollo server.
//TODO: Look into the applyMiddleware method. Need to understand how it works for apollo.
const startApollo = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`GraphQL available at: http://localhost:${PORT}${server.graphqlPath}`);
    })
  });

}

startApollo(typeDefs, resolvers);