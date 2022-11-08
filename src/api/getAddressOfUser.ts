export const getAddressOfUser = async (userTag: string): Promise<string> => {
    return Promise.resolve(process.env.ADDRESS!);
};
