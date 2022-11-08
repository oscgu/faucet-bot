import { User } from "./UserModel";

export const getLastRequestDate = async (column: string, userId: string) => {
    const lastRequestDate = await User.findOne({
        attributes: [column],
        where: { DiscordId: userId }
    });
    if (!lastRequestDate) return 0;

    return lastRequestDate?.toJSON()[column];
};

export const upsertLastRequestDate = async (
    column: string,
    userId: string,
    unixTimestamp: number
) => {
    await User.upsert({
        DiscordId: userId,
        [column]: unixTimestamp
    });
};
