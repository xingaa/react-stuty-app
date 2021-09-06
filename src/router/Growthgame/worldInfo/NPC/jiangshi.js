export default (level = 1) => {
    return {
        name: "僵尸",
        describe: "面目狰狞，眼珠垂钓在脖子上",
        attack: 5 * level,
        avoid: 0.01 * level, //躲避
        hp: 30 * level,
        exp: 50 * level,
        initiative: 2000, //主动攻击时间
        attackSpeed: 2000 * level, //攻击速度
        beatBack: 0.05 * level, //反击
        agile: 1 * level, //敏捷
    }
}