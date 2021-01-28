import OldApp from './App.old';
import {_App} from "../libs/miniapp";
import {appLogger} from '../libs/logger';

const newApp = _App.create(OldApp);
newApp.use(appLogger);
newApp.use({
    onLaunch() {
        return {
            before() {
                console.log('App.onLaunch before1', this.oldName);
            }
        };
    }
}).use({
    onLaunch() {
        return {
            before() {
                console.log('App.onLaunch before2');
            }
        };
    }
});
export default newApp;