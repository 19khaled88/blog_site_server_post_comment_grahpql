export const Profile = {
    user: async (parent, args, { prisma, userInfo }) => {
        const response = await prisma.user.findUnique({
            where: {
                id: userInfo.userId
            }
        });
        return response;
    }
};
//# sourceMappingURL=Profile.js.map