


export const profileResolvers ={
  
    profile_create: async (parent: any, args: any, {prisma,userInfo}: any) => {
     

        const isExist = await prisma.profile.findFirst({
          where: {
            userId: userInfo.userId
          }
        })
        if (isExist) {
          return {
            message: 'Profile already created',
            status: 400,
            result: null
          }
        }
        
  
        const profile_created = await prisma.profile.create({
          data: {
            userId:userInfo.userId,
            country: '',
            location: '',
            age: '',
            avatar:''
          }
        })
        return {
          message: 'Profile created successfully',
          status: 200,
          result: profile_created
        }
      },
  
  
      profile_update: async (parent: any, args: any, {prisma}: any) => {
        const isValid = await prisma.profile.findFirst({
          where: {
            userId: args.id
          }
        })
  
        if (!isValid) {
          return {
            message: "This profile not exist",
            status: 400,
            result: null
          }
        }
  
        const update_profile = await prisma.profile.update({
          where:{
            id:args.id
          },
          data:args.input
        })
  
        return {
          message: "Profile updated successfully",
            status: 200,
            result: update_profile
        }
      },
}