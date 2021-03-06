# 微信小程序 Hook

hook 小程序组件（App, Page, Component）的生命周期方法。


## Usage

开启微信小程序的 npm 支持：
[https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

package.json

```json
{
  "dependencies": {
    "miniapp-hook": "0.1.1"
  }
}

```

```shell script
    npm install
```

### 配置钩子

由于 App，Page等方法是框架提供的，因此最后必要直接全局的 App，Page 等方式，建议使用包装的方式创建新的函数。一个示例如下：

app.new.js

```javascript
const { _App, _Page, _Component, appLogger, pageLogger} = require('miniapp-hook');

_App.use(appLogger);
_Page.use(pageLogger);
_Page.use({
    onLoad() {
        return {
            before() {
                console.log(this.route, 'new Page.onLoad...... before', this.oldName);
            }
        };
    }
});
_Component.use({
    'methods.onTap': function () {
      return {
          before(e) {
              wx.showModal({
                  content: 'newComponent.onTap'
              });
          }
      }
    }
});

```

app.js

```javascript
import {_App as App} from './app.new';
App({
    onLaunch () {
    }
})
```

如果你的小程序原本就已经包装了 App， Page 等框架方法，那么也可以再包装直接使用，已 App 为例：

app.new.js

```javascript
import OldApp from './App.old';
const { _App } = require('miniapp-hook');
const newApp = _App.create(OldPage); // OldApp 是你自定义的App包装函数
newApp.use({
    onLaunch() {
        return {
            before() {
                console.log('new App.onLaunch...... before 1', this.oldName);
            }
        };
    }
})
export default newApp;
```

app.js

```javascript
import {_App as App} from './app.new';
App({
    onLaunch () {
    }
})
```

pages/sample/index.js

```javascript
import {_Page as Page} from './app.new';
Page({
    onLoad () {
    }
})
```