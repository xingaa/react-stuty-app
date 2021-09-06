import shilaimu from "./NPC/shilaimu"
import wushi from "./wushi"

export default () => {
    return {
        name: "桐埠村",
        describe: "这里是你出身之地",
        address: [wushi],
        NPC: [shilaimu(), shilaimu(), shilaimu(), shilaimu(), shilaimu(), shilaimu(), shilaimu()]
    }
}