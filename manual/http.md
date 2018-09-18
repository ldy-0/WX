## 用法示例

- 在 script 中引入

```js
import { shttp } from "../utils/http";
```

> get 请求例子

```js
  async gettest() {
    const res = await shttp
      .get(`apiUrl`)
      .query({key1:'value'})
      .end();
  }
```

> put 请求例子

```js
  async puttest() {
    const res = await shttp
      .put(`apiUrl`)
      .send({key1:'value'})
      .end();
  }
```

> post 请求例子

```js
  async posttest() {
    const res = await shttp
      .get(`apiUrl`)
      .send({key1:'value'})
      .end();
  }
```

> delete 请求例子

```js
  async deletetest() {
    const res = await shttp
      .delete(`apiUrl`)
      .end();
  }
```
