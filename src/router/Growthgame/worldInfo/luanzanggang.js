import jiangshi from "./NPC/jiangshi"
import yelang from "./NPC/yelang"
import wushi from "./wushi"



export default () => {
    return {
        name: "乱葬岗",
        describe: "尸骨遍地,恶臭弥漫",
        address: [wushi],
        NPC: [jiangshi(), jiangshi(), jiangshi(), jiangshi()]
    }
}