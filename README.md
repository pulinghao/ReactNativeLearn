# ReactNavtiveLearn

## 页面导航：React Navigation



官网给了两种方案`react native navigation`和`react navigation`进行页面间的导航，前者我没实验成功，而且官网也主推了后者。下面介绍下后者的配置

### 安装`react navigation`

1. 安装`react-navigation/native`

```
npm install @react-navigation/native

yarn add @react-navigation/native
```

2. 安装`native-stack`

```shell
# npm
npm install @react-navigation/native-stack
# yarn
yarn add @react-navigation/native-stack
```

### 页面跳转

- Home为主页面
- Detail为子页面

```javascript
// In App.js in a new project

// In App.js in a new project

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {  // 括号里面必须有navigation
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
			<Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

```

这里有几个注意点：

1. `navigation.navigate()`跳转到某个页面，但再次点击不能继续跳转。比如说自己跳转自己的时候，不能用navigate接口

2. `navigation.push()`也是跳转到某个页面，但是可以重复跳转到同一个页面。

3. 使用`push`的时候，`DetailsScreen`中要遵循`navigation`的协议

### 传参

```javascript

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
```

- 页面A封装JSON结构数据
- 页面B需要遵循`route`协议，从`route.params`中拿到对应的参数

### 嵌套导航控制器

- 如果当前嵌套的页面不能响应导航的请求，那么会由父页面响应

### 生命周期

<img src="/Users/pulinghao/W_Github/ReactNativeLearn/README.assets/image-20211117172104831.png" alt="image-20211117172104831" style="zoom:50%;" />

- 通过监听`focus`和`blur`来确定，当前的页面是否被聚焦/失焦。

### 其他导航器

- TabNavigator

### 自定义导航控制器

#### router

参考`@react-navigation/routers/lib/module/StackRouter.js`的写法，自定义一个router

#### navigator

## 事件响应链

`onStartShouldSetResponder`与`onMoveShouldSetResponder`是以冒泡的形式调用的，即嵌套**最深的节点**最先调用。这意味着当多个 View 同时在`*ShouldSetResponder`中返回 true 时，最底层的 View 将优先“夺权”。在多数情况下这并没有什么问题，因为这样可以确保所有控件和按钮是可用的。

但是有些时候，某个父 View 会希望能先成为响应者。我们可以利用“捕获期”来解决这一需求。响应系统在从最底层的组件开始冒泡之前，会首先执行一个“捕获期”，在此期间会触发`on*ShouldSetResponderCapture`系列事件。因此，如果某个父 View 想要在触摸操作开始时阻止子组件成为响应者，那就应该处理`onStartShouldSetResponderCapture`事件并返回 true 值。



## 性能

## 网络

- `fetch`接口
- `XMLHttpRequest API`，但不推荐
- `WebSocket`



## 面试

### 自己梳理

- 事件的响应链
- 响应者声明周期