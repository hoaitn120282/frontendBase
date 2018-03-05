# Best practice

1.  React

*   Luôn định nghĩa kiểu giá trị của props trong component

<span style="color:red">Avoid</span>

```js
class DemoComponent extends PureComponent {
    componentWillMount() {
        // Request here
    }
    render() {
        const { data } = this.props;
        return <div>{data.name}</div>;
    }
}

export default DemoComponent;
```

<span style="color:green">Should</span>

```js
class DemoComponent extends PureComponent {
    componentWillMount() {
        // Request here
    }
    render() {
        const { data } = this.props;
        return <div>{data.name}</div>;
    }
}

DemoComponent.propTypes = {
    data: PropTypes.object.isRequired
};

// Hoặc
DemoComponent.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired
    })
};

export default DemoComponent;
```

> Ý nghĩa: Việc khai báo kiểu giá trị giúp cho việc debug dễ dàng hơn trong trường hợp dữ liệu truyền vào không đúng định dạng. Dễ dàng cho việc bảo trì vì chỉ cần nhìn vào propTypes là đã có thể biết được có những props nào được sử dụng trong component

Link tham khảo: [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

*   Nên sử dụng stateless để tăng tốc độ render của ứng dụng

<span style="color:red">Avoid</span>

```js
// Avoid
class DemoComponent extends PureComponent {
    render() {
        const { data } = this.props;
        return <div>{data.name}</div>;
    }
}

DemoComponent.propTypes = {
    data: PropTypes.object.isRequired
};

export default DemoComponent;
```

<span style="color:green">Should</span>

```js
// Should
const DemoComponent = ({ data }) => {
    return <div>{data.name}</div>;
};

DemoComponent.propTypes = {
    data: PropTypes.object.isRequired
};

export default DemoComponent;
```

2.  Biến và giá trị

*   Nên khai báo giá trị mặc định cho các đối tượng
*   Với `object` nếu lấy properties có cấp từ 2 trở lên chúng ta không nên lấy trực tiếp tránh việc object không tồn tại

<span style="color:red">Avoid</span>

```js
const objectDemo = {
    data: {
        name: 'my name'
    }
};

console.log(objectDemo.data.name); //my name
console.log(objectDemo.address.name); // Error
```

<span style="color:green">Should</span>

```js
import _ from 'lodash';

const objectDemo = {
    data: {
        name: 'my name'
    }
};

console.log(_.get(objectDemo, 'data.name', ''); //my name
console.log(_.get(objectDemo, 'address.name', 'Ha Noi'); // Ha Noi
```

> Ở đây mình sử dụng **lodash**, mọi người có thể sử dụng 1 thư viện khác nhé
