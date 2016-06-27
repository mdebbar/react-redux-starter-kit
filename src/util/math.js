export const randomInt = (min, max) => Math.floor(min + Math.random() * (max - min))

export const distance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

export const angle = (p1, p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x)
