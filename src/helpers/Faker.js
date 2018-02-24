export function image(width = 100, height = 100, tag = 'people') {
    return `http://lorempixel.com/${width}/${height}/${tag}`;
}

export const avatar = () => {
    return `http://lorempixel.com/128/128/people`;
};

export const findName = () => {
    return 'Fake name';
};

export const loremWorlds = (length = 5) => {
    return 'Fake worlds';
};
