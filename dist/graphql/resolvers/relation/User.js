export const User = {
    posts: async (parent, { postId, post }, { prisma, userInfo }) => {
        const response = await prisma.post.findMany({
            where: {
                userId: parent.id
            }
        });
        return response;
    }
};
//# sourceMappingURL=User.js.map