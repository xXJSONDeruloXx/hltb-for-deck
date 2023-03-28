export const normalize = (str: string) => {
    console.log(str);
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9\-\/\s]/g, '')
        .trim();
};
