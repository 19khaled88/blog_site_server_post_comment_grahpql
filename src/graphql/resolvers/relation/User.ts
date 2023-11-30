
export const User = {
    posts:async(parent: any, { postId, post }: any, { prisma, userInfo }:any)=>{
        
        const response  = await prisma.post.findMany({
            where:{
                userId:parent.id
            }
        })
        return response
    }
}