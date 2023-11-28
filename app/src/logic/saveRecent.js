export default function saveRecent(search) {
    const recent = "recent" in localStorage ? JSON.parse(localStorage.recent) : []

    for (const item of recent) {
        if (item.name === search.name) {
            const index = recent.indexOf(item)
            recent.splice(index, 1)
        }
    }
    recent.unshift(search)

    localStorage.recent = JSON.stringify(recent)
}