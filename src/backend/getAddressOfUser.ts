export const getAddressOfUser = async (userId: string): Promise<string> => {
    return Promise.resolve(process.env.ADDRESS!);
};
