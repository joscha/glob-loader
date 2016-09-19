module.exports = [
    require("./dir.pattern"),
    require("!!glob!./js.pattern?cwd=./dir2")
];
