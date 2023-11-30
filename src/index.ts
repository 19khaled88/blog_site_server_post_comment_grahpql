import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from '@prisma/client/runtime/library';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/schema';
import { jwtHelper } from './utils/jwtValidation';

export const prisma = new PrismaClient()


const app = express()

//middlewares
app.use(cors());
app.use(express.json())

//create http server
const httpServer = http.createServer(app)



interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  userInfo: {
    userId: number
  } 
}



interface MyContext {
  token?: String;
}

const startApolloServer = async( ) => {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection:true,
    
  });

  await server.start();

  app.use(
    '/graphqlApi',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server,{
      context:async({req}):Promise<Context>=>{
        const userInfo = await jwtHelper.getInfoFromToken(req.headers.authorization as string)
        
        return{
          prisma,
          userInfo
        }
      }
    })
  );

  await new Promise<void>((resolve)=>httpServer.listen({port:4001}))
}

startApolloServer()

console.log(`🚀 Server ready at http://localhost:4001/graphqlApi`);

