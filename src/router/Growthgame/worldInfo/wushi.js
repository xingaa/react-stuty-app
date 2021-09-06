import shilaimu from "./NPC/shilaimu"
import yelang from "./NPC/yelang"
import firstPlace from "./firstPlace"
import luanzanggang from "./luanzanggang"


export default () => {
    return {
        name: "乌石镇",
        describe: "此地有股阴森之气",
        address: [firstPlace, luanzanggang],
        NPC: [yelang(), yelang(), yelang(), yelang()]
    }
}