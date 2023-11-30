
export const Profile = {
    user:async(parent: any, args: any, { prisma, userInfo }:any)=>{
        const response = await prisma.user.findUnique({
            where:{
                id:userInfo.userId
            }
        })
        return response
    }
}