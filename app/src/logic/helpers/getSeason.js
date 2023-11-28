export default function getSeason(latitude) {
    const hemisphere = latitude >= 0 ? "north" : "south";
    const now = new Date()

    const springEquinox = new Date(now.getFullYear(), 2, 20)

    const summerSolstice = new Date(now.getFullYear(), 5, 20)

    const autumnEquinox = new Date(now.getFullYear(), 8, 22)

    if (hemisphere === "north") {
        if (now < springEquinox) {
            return "winter"
        } else if (now < summerSolstice) {
            return "spring"
        } else if (now < autumnEquinox) {
            return "summer"
        } else {
            return "autumn"
        }
    } else {
        if (now < springEquinox) {
            return "summer"
        } else if (now < summerSolstice) {
            return "autumn"
        } else if (now < autumnEquinox) {
            return "winter"
        } else {
            return "spring"
        }
    }
}