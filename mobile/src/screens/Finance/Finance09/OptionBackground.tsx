import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageSourcePropType,
  ImageBackground,
} from "react-native";

import { AppIcon, LayoutCustom, Text } from "components";
import {
  Spinner,
  useTheme,
  useStyleSheet,
  StyleService,
} from "@ui-kitten/components";
import EvaIcons from "types/eva-icon-enum";
import { useLayout } from "hooks";

interface OptionBackgroundProps {
  src: string;
  onSelect(): void;
  active: boolean;
}

const OptionBackground: React.FC<OptionBackgroundProps> = ({
  src,
  onSelect,
  active,
}) => {
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const size = { width: (width / 3 - 24) * (width / 375), height: 173 };
  const [loading, setLoading] = React.useState(true);
  return (
    <LayoutCustom style={[styles.container, size]} onPress={onSelect} level="3">
      {loading ? <Spinner size={"large"} /> : null}
      <ImageBackground
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
        source={{ uri: src }}
        style={!loading ? size : { width: 1, height: 1, opacity: 0 }}
      >
        {active && (
          <AppIcon
            layoutIconStyle={styles.layoutIcon}
            name={EvaIcons.CheckmarkCircle}
            size={24}
            fill={theme["text-primary-color"]}
          />
        )}
      </ImageBackground>
    </LayoutCustom>
  );
};

export default OptionBackground;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  layoutIcon: {
    borderRadius: 4,
    width: 28,
    height: 28,
    backgroundColor: "background-basic-color-1",
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
    alignSelf: "flex-end",
  },
});
