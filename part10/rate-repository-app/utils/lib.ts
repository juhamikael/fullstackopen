export const formattedStats = (count: number) => {
    return count > 1000 ? `${Math.round(count / 100) / 10}k` : count;
}

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};