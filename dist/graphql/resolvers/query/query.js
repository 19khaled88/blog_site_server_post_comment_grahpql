export const Query = {
    users: async (parent, args, { prisma }) => {
        return await prisma.user.findMany({});
    },
    profile: async (parent, args, { prisma, userInfo }) => {
        return await prisma.user.findFirst({
            where: {
                id: userInfo.userId
            }
        });
    },
    posts: async (parent, args, { prisma }) => {
        const response = await prisma.post.findMany({
            // where:{
            //   published:true
            // },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return response;
    }
};
//# sourceMappingURL=query.js.map