function log(name, events) {
    return events.reduce((t, event) => {
        t[event] = function () {
            return {
                before() {
                    console.log(this.route, `${name}.${event}`);
                }
            }
        };
        return t;
    }, {});
}

const appLogger = {
    onLaunch() {
        return {
            before(options) {
                console.log('appLogger.onLaunch', options);
            }
        }
    },
    onShow() {
        return {
            before(options) {
                console.log('appLogger.onShow', options);
            }
        }
    }
};

const pageLogger = {
    onLoad() {
        return {
            before(query) {
                console.log(this.route, 'pageLogger.onLoad', this.data, query);
            }
        }
    },
    ...log('pageLogger', ['onShow', 'onReady', 'onHide', 'onUnload'])
};

module.exports = {
    appLogger,
    pageLogger
}