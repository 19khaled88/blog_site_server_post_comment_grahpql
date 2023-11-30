import { userLoader } from "../../../loader/userLoader";
export const Post = {
    user: async (parent, args, { prisma, userInfo }) => {
        // const response = await prisma.user.findUnique({
        //     where:{
        //         id:parent.userId
        //     }
        // })
        // return response
        const response = await userLoader.load(parent.userId);
        // return userLoader.load(parent.userId)
        return response;
    }
};
//# sourceMappingURL=Post.js.map