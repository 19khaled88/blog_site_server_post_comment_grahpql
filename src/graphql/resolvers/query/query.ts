import { userInfo } from "os"


export const Query = {
    users: async (parent: any, args: any, {prisma}: any) => {
      return await prisma.user.findMany({})
    },

    profile: async (parent: any, args: any, {prisma,userInfo}: any) => {
      return await prisma.user.findFirst({
        where: {
          id: userInfo.userId
        }
      })
    },

    posts:async(parent: any, args: any, {prisma}: any)=>{
      const response =  await prisma.post.findMany({
        // where:{
        //   published:true
        // },
        orderBy:{
          createdAt:'desc'
        }
        
      })
      return response
    }
  }