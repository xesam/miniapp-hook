const {App, Page, Component, appLogger, pageLogger} = require('./libs/hook');

App.add(appLogger);
Page.add(pageLogger);

Component.add({
    created() {
        return {
            before() {
                this.onTap = function () {
                    wx.showModal({
                        content: 'dynamic onTap'
                    });
                };
            }
        }
    }
});

App({
    onLaunch: function () {
    }
})