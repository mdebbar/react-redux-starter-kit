export const randomInt = (min, max) => Math.floor(min + Math.random() * (max - min))

export const distance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
