export const formattedStats = (count: number) => {
    return count > 1000 ? `${Math.round(count / 100) / 10}k` : count;
}