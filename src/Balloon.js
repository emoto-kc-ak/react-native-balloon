import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ViewPropTypes,
  TouchableOpacity
} from "react-native";

const TRIANGLE_SIZE = 10;
const WIDTH = 300;
const HEIGHT = 50;
const BACKGROUND_COLOR = "#FFF";
const BORDER_COLOR = "#CCC";
const BORDER_WIDTH = 1;
const TRIANGLE_OFFSET = "30%";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent"
  },
  balloonContainer: {
    // margin depends on the direction of the triangle part.
    // margin: TRIANGLE_SIZE,
    // balloon size is determined according to its children.
    // width: WIDTH,
    backgroundColor: BACKGROUND_COLOR,
    borderColor: BORDER_COLOR,
    borderWidth: BORDER_WIDTH,
    borderRadius: 10,
    padding: 8,
    flexDirection: "row"
  },
  childrenContainer: {
    // balloon size is determined according to its children.
    // flex: 1
  }
});

export default class Balloon extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    borderRadius: PropTypes.number,
    backgroundColor: PropTypes.string,
    triangleOffset: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    triangleDirection: PropTypes.string,
    triangleSize: PropTypes.number,
    containerStyle: ViewPropTypes.style,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func
  };

  get width() {
    return this.props.width || WIDTH;
  }

  get height() {
    return this.props.height || HEIGHT;
  }

  get borderColor() {
    return this.props.borderColor || BORDER_COLOR;
  }

  get borderWidth() {
    return this.props.borderWidth || BORDER_WIDTH;
  }

  get backgroundColor() {
    return this.props.backgroundColor || BACKGROUND_COLOR;
  }

  get triangleOffset() {
    return this.props.triangleOffset != null
      ? this.props.triangleOffset
      : TRIANGLE_OFFSET;
  }

  get triangleSize() {
    return this.props.triangleSize || TRIANGLE_SIZE;
  }

  get triangleStyle() {
    const direction = this.props.triangleDirection || "bottom";

    const base = {
      position: "absolute",
      width: 0,
      height: 0,
      zIndex: 100
    };
    const isStringOffset = typeof this.triangleOffset === 'string';
    switch (direction) {
      case "top":
        return {
          ...base,
          top: 0,
          ...(isStringOffset || this.triangleOffset >= 0 ? {
            left: this.triangleOffset
          } : {
            right: -this.triangleOffset
          }),
          borderLeftColor: "transparent",
          borderLeftWidth: this.triangleSize / 2,
          borderBottomWidth: this.triangleSize,
          borderBottomColor: this.borderColor,
          borderRightWidth: this.triangleSize / 2,
          borderRightColor: "transparent"
        };
      case "left":
        return {
          ...base,
          left: 0,
          ...(isStringOffset || this.triangleOffset >= 0 ? {
            top: this.triangleOffset
          } : {
            bottom: -this.triangleOffset
          }),
          borderTopColor: "transparent",
          borderTopWidth: this.triangleSize / 2,
          borderRightWidth: this.triangleSize,
          borderRightColor: this.borderColor,
          borderBottomWidth: this.triangleSize / 2,
          borderBottomColor: "transparent"
        };
      case "right":
        return {
          ...base,
          right: 0,
          ...(isStringOffset || this.triangleOffset >= 0 ? {
            top: this.triangleOffset
          } : {
            bottom: -this.triangleOffset
          }),
          borderTopColor: "transparent",
          borderTopWidth: this.triangleSize / 2,
          borderLeftWidth: this.triangleSize,
          borderLeftColor: this.borderColor,
          borderBottomWidth: this.triangleSize / 2,
          borderBottomColor: "transparent"
        };
      default:
        return {
          ...base,
          bottom: 0,
          ...(isStringOffset || this.triangleOffset >= 0 ? {
            left: this.triangleOffset
          } : {
            right: -this.triangleOffset
          }),
          borderLeftColor: "transparent",
          borderLeftWidth: this.triangleSize / 2,
          borderTopWidth: this.triangleSize,
          borderTopColor: this.borderColor,
          borderRightWidth: this.triangleSize / 2,
          borderRightColor: "transparent"
        };
    }
  }

  get triangleInnerStyle() {
    const direction = this.props.triangleDirection || "bottom";
    switch (direction) {
      case "top":
        return {
          borderBottomColor: this.backgroundColor,
          top: this.borderWidth * 2
        };
      case "left":
        return {
          borderRightColor: this.backgroundColor,
          left: this.borderWidth * 2
        };
      case "right":
        return {
          borderLeftColor: this.backgroundColor,
          right: this.borderWidth * 2
        };
      default:
        return {
          borderTopColor: this.backgroundColor,
          bottom: this.borderWidth * 2
        };
    }
  }

  get margin() {
    const direction = this.props.triangleDirection || "bottom";
    const triangleSize = this.triangleSize;
    switch (direction) {
      case "top":
        return { marginTop: triangleSize };
      case "left":
        return { marginLeft: triangleSize };
      case "right":
        return { marginRight: triangleSize };
      case "bottom":
        return { marginBottom: triangleSize };
    }
  }

  render() {
    const {
      width,
      height,
      borderColor,
      backgroundColor,
      borderRadius,
      borderWidth,
      containerStyle,
      triangleOffset,
      triangleDirection,
      triangleSize,
      onPress,
      onLongPress,
      ...attributes
    } = this.props;

    const Component = onPress || onLongPress ? TouchableOpacity : View;
    return (
      <Component style={styles.container}>
        <View
          style={[
            styles.balloonContainer,
            width && { width },
            height && { height },
            borderColor && { borderColor },
            borderWidth && { borderWidth },
            borderRadius && { borderRadius },
            backgroundColor && { backgroundColor },
            this.margin,
            containerStyle && containerStyle
          ]}
        >
          <View style={styles.childrenContainer}>{this.props.children}</View>
        </View>
        <View style={[this.triangleStyle]} />
        <View style={[this.triangleStyle, this.triangleInnerStyle]} />
      </Component>
    );
  }
}
