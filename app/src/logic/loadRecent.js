export default function loadRecent() {
    const list = "recent" in localStorage ? JSON.parse(localStorage.recent) : []
    return list.slice(0, 5)
}