import React from "react";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet } from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
// ----------------------------- Hooks ---------------------------------------

// ----------------------------- Components && Elements -----------------------
import { LayoutCustom, Text } from "components";

// ----------------------------- Types ---------------------------------------
import { ImageBackground } from "react-native";
import theme from "theme";

const ActionCard = React.memo(({ title, color }: { title: string, color: string }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <LayoutCustom alignSelfCenter style={styles.container}>
      {/* @ts-ignore */}
      <ImageBackground style={{ ...styles.imageCard, backgroundColor: color }} source={require("../../../assets/images/icons/illustration.png")}>
        <LayoutCustom itemsCenter style={styles.infoContainer}>
          <Text fontSize={17} status="basic">{title}</Text>
        </LayoutCustom>
      </ImageBackground>
    </LayoutCustom>
  );
});

export default ActionCard;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 20,
    backgroundColor: "background-basic-color-3",
    marginHorizontal: 16,
    overflow: "hidden",
    height: '100%',
    width: '85%',
  },
  infoContainer: {
    padding: theme.paddings.medium,
    height: "100%",
    justifyContent: 'center'
  },
  imageCard: {
    height: "100%",
    // backgroundColor: "#701BC4"
  },
  grow: {
    borderRadius: 99,
    alignSelf: "flex-end",
    marginBottom: 4,
    backgroundColor: "background-basic-color-1",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  moneyText: {
    color: '#009F9F'
  }
});
