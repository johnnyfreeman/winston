var Command = function (title, description, handler) {
    this.title = title;
    this.description = description;
    this.handler = handler;
};

Command.prototype.run = function () {
    return this.handler();
};
