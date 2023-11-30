import { prisma } from "..";
import DataLoader from "dataloader";
const batchUsers = async (ids) => {
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: ids
            }
        }
    });
    const userData = {};
    users.forEach((user) => {
        userData[user.id] = user;
    });
    const response = ids.map((id) => userData[id]);
    return response;
    // return ids.map((id)=>userData[id])
};
export const userLoader = new DataLoader(batchUsers);
//# sourceMappingURL=userLoader.js.map