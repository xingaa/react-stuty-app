export default (level = 1) => {
    return {
        name: "史莱姆",
        describe: "长得像个蓝色的坨坨",
        attack: 1 * level,
        avoid: 0.01 * level,
        hp: 5 * level,
        exp: 2 * level,
        initiative: 100000, //主动攻击时间
        attackSpeed: 2000 * level, //攻击速度
        beatBack: 0.01 * level, //反击
        agile: 1 * level, //敏捷
    }
}