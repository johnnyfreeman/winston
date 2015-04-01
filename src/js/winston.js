var Winston = function () {
    this.appComponent = React.createElement(App, null);
    this.registeredPackages = {};
    this.bootedPackages = {};

    React.render(this.appComponent, document.body);
};
