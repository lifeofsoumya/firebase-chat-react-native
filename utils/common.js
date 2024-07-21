

export const getRoomId = (userId1, userId2) => {
    const sortedIds = [userId1, userId2].sort();
    return sortedIds.join('-');
}

export const formatDate = timestamp => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const now = new Date();

    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(todayStart.getDate() - 1);

    if (date >= todayStart) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date >= yesterdayStart) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
}