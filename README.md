# react-native-balloon

An UI component to draw balloons.  
![balloon_example](https://user-images.githubusercontent.com/7026785/36620231-6514b930-1935-11e8-84e2-79a25e44f25a.png)

This fork has the following differences from the original,
- The width of a balloon is determined according to its children if `width` is omitted.
- A balloon gives a margin only to the side matching the triangle direction.
- `triangleOffset` may be either a string (percentage) or number (pixels).
- If `triangleOffset` is a negative number, its absolute value is treated as an offset from the bottom or right of a balloon.

## Install

```
npm install https://github.com/emoto-kc-ak/react-native-balloon.git#v1.1.0-alpha.0
```

## Usage

```js
import Balloon from "react-native-balloon";


<Balloon
  borderColor="#2E86C1"
  backgroundColor="#D6EAF8"
  borderWidth={2}
  borderRadius={20}
  triangleSize={15}
  onPress={() => console.log("press")}
>
  <Text>Hello world</Text>
</Balloon>
```


## Properties

| Prop | Default | Type | Description |
|---|---|---| ---|
|**`width`**| none | `number`|width of balloon|
|**`height`**| none | `number`|height of balloon|
|**`borderColor`**| `#CCC` | `string`|color of border|
|**`borderWidth`**| `1` | `number`|width of border|
|**`borderRadius`**| `10` | `number`|radius of border|
|**`backgroundColor`**| `#FFF` | `string`|color of background|
|**`triangleOffset`**| `30%` | `string` \| `number` |specify the offset of triangle position from top or left as percentage or pixels. if a negavie number is given, its absolute value is treated as the offset from bottom or right |
|**`triangleDirection`**| `left` | `string`|specify the triangle direction from `top`/`bottom`/`left`/`right`.  |
|**`triangleSize`**| `10` | `number`|specify the size of triangle|
|**`containerStyle`**| none | `object`|specify the style of balloon container. |
|**`onPress`**| none | `function`|triggered on press balloon.|
|**`onLongPress`**| none | `function`|triggered on long press balloon.|



## License

[MIT License](http://opensource.org/licenses/mit-license.html).
