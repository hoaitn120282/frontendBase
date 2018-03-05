# Cấu trúc thư mục

*   src
    *   [assets](#assets)
    *   [components](#components)
    *   [constants](#constants)
    *   [containers](#containers)
    *   [helpers](#helpers)
    *   [modules](#modules) (Thư mục chính)
    *   [reducers](#reducers)
    *   [redux-utils](redux-utils) (Thư mục chính)
    *   [routes](#routes)
    *   [sagas](#sagas)
    *   [shared](#shared)
    *   [stores](#stores)
    *   App.js
    *   index.js

# Variables

NODE_PATH=src

# Ý nghĩa thư mục

## assets

*   Lưu trữ assets cho dự án (ảnh, video...)
*   Cú pháp gọi

```js
// Gọi file logo.png từ thư mục src/assets/logo.png
import logo from 'assets/logo.png';
```

## components

*   Dùng để lưu trữ tất cả các thành phần tái sử dụng cho dự án
*   Cú pháp gọi

```js
// Gọi tới component Overlay từ thư mục src/components/loading/Overlay
import Ovarlay from 'components/loading/Overlay';
```

## constants

*   Dùng để lưu trữ các biến toàn cục cho dự án

## containers

*   Chứa một số cấu hình lúc khởi tạo cho dự án (không sửa nếu không cần thiết)

## helpers

*   Chứa các hàm tiện ích cho dự án
*   Cú pháp gọi

```js
import Request from 'helpers/Request';
```

## modules

*   Là thư mục chính của dự án

## reducers

*   Cấu hình root redux (Không chỉnh sửa)

## redux-utils

*   Thư mục chính của dự án

## routes

*   Cấu hình router của dự án trong file `appRoutes.js`

## sagas

*   Cấu hình cho redux-saga (Không chỉnh sửa)

## shared

*   Thư mục lưu trữ SASS dùng chung cho dự án

## stores

*   Cấu hình store và các middleware cho dự án (Không chỉnh sửa)
