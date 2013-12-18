module.exports = function (app) {
    require("./routes/pages.js")(app);
    require("./routes/api.js")(app);
};