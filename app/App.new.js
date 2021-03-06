import OldApp from './App.old';

const {_App, appLogger} = require('../libs/index');

const newApp = _App.create(OldApp);
newApp.use(appLogger);
newApp.use({
    onLaunch() {
        return {
            before() {
                console.log('new App.onLaunch...... before 1', this.oldName);
            }
        };
    }
}).use({
    onLaunch() {
        return {
            before() {
                console.log('new App.onLaunch...... before 2', this.oldName);
            }
        };
    }
});
export default newApp;