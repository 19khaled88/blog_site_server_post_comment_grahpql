import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {expressMiddleware} from '@apollo/server/express4'
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from '@prisma/client/runtime/library';
import { jwtHelper } from './utils/jwtValidation';
import http from 'http'
import express from 'express'
import cors from 'cors'

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



// interface MyContext {
//   token?: String;
// }

// const startApolloServer = async( ) => {
//   const server = new ApolloServer<MyContext>({
//     typeDefs,
//     resolvers,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//   });

//   await server.start();
//   app.use(
//     '/',
//     cors<cors.CorsRequest>(),
//     express.json(),
//     expressMiddleware(server,{
//       context:async({req}):Promise<Context>=>{
//         const userInfo = await jwtHelper.getInfoFromToken(req.headers.authorization as string)
//         return{
//           prisma,
//           userInfo
//         }
//       }
//     })
//   );

//   await new Promise<void>((resolve)=>httpServer.listen({port:4001}))
// }

// startApolloServer()

// console.log(`🚀 Server ready at http://localhost:4001/graphql`);



const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[]
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  
    context: async ({ req }): Promise<Context> => {
      const userInfo = await jwtHelper.getInfoFromToken(req.headers.authorization as string)
        
      return {
        prisma,
        userInfo
      }
    }
    
  });
 
  

  console.log(`🚀  Server ready at: ${url}`);
}

main().catch(e => console.error(e));