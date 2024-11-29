const FormatDate = (date: string) => {
    return new Date(date).toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export {FormatDate}