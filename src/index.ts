import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";


async function init() {
  const app = express();

  app.use(express.json());

  const server = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
        say(name: String): String
      }
    `, //schema
    resolvers: {
      Query: {
        hello: () => 'Hello World from resolver',
        say: (_, {name}: {name: string}) =>  `Hi Big Boy ${name}. See you later`
      }
    }, //actual function of query and mutation
  });

  await server.start();

  app.get('/', (req, res) => {
    res.send('Hello World 2');
  });

  app.use('/graphql', expressMiddleware(server));

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });

}

init();