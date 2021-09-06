export default (level = 1) => {
    return {
        name: "野狼",
        describe: "时时刻刻露出凶恶的獠牙",
        attack: 2 * level,
        avoid: 0.01 * level, //躲避
        hp: 10 * level,
        exp: 5 * level,
        initiative: 2000, //主动攻击时间
        attackSpeed: 1000 * level, //攻击速度
        beatBack: 0.05 * level, //反击
        agile: 2 * level, //敏捷
    }
}