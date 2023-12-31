import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { PrismaClient } from "@prisma/client";
import { jwtHelper } from './utils/jwtValidation';
import http from 'http';
import express from 'express';
import cors from 'cors';
export const prisma = new PrismaClient();
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
//create http server
const httpServer = http.createServer(app);
const startApolloServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    app.use('/graphqlApi', cors(), express.json(), expressMiddleware(server, {
        context: async ({ req }) => {
            const userInfo = await jwtHelper.getInfoFromToken(req.headers.authorization);
            return {
                prisma,
                userInfo
            };
        }
    }));
    await new Promise((resolve) => httpServer.listen({ port: 4001 }));
};
startApolloServer();
console.log(`🚀 Server ready at http://localhost:4001/graphqlApi`);
//# sourceMappingURL=index.js.map