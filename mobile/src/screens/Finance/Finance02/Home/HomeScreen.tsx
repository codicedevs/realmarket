import React, { useState } from "react";
import { Image } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  TopNavigation,
  useStyleSheet
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
// ----------------------------- Components && Elements -----------------------

import {
  Container,
  Content,
  LayoutCustom,
  RoundedButton,
  Text,
} from "components";
import CurrencyToggle from "components/Switch";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import theme from "theme";
import { FinanceStackParamList } from "types/navigation-types";
import IButton from "./IButton";
import TimeCard from "./TimeCard";
// import CurrencyToggle from "../../../../components/Switch";

const HomeScreen = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<FinanceStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const [currency, setCurrency] = useState('ARS')

  const progressValue = useSharedValue<number>(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        alignment="center"
        title="Home"
        style={styles.topNavigation}
        accessoryLeft={() => (
          <RoundedButton
            icon="arrow-left"
            onPress={() => navigate("FinanceIntro")}
          />
        )}
        accessoryRight={() => <RoundedButton icon="person_fill" />}
      />
      <Content>
        <LayoutCustom itemsCenter mt={theme.margins.large} mb={theme.margins.medium}>
          <CurrencyToggle changeCurrency={setCurrency} />
        </LayoutCustom>
        <LayoutCustom alignSelfCenter>
        </LayoutCustom>
        <Carousel
          data={CARDS}
          width={width * 0.9}
          height={212 * (height / 812)}
          loop={false}
          style={{ ...themedStyles.carouselStyle, width: width }}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.96,
            parallaxScrollingOffset: 10,
          }}
          renderItem={({ item, index }) => {
            return <TimeCard item={item} />
          }}
        />
        {/* <LayoutCustom horizontal itemsCenter justify="center" gap={8}>
          {CARDS.map((item, index) => {
            return (
              <PaginationItem
                backgroundColor={theme["background-basic-color-6"]}
                animValue={progressValue}
                index={index}
                key={index}
                length={CARDS.length}
              />
            );
          })}
        </LayoutCustom> */}
        <LayoutCustom horizontal itemsCenter justify="flex-start" pl={theme.paddings.large} mt={theme.margins.medium}>
          <Image style={themedStyles.img} source={require("../../../../assets/images/icons/moneyStat.png")} />
          <LayoutCustom ml={20} style={{ alignItems: "flex-start" }}>
            <Text style={{ fontSize: 20, marginBottom: 3 }}>Posiciones</Text>
            <Text style={themedStyles.moneyText} fontSize={20} category="t5">$20.455.342,88</Text>
          </LayoutCustom>
        </LayoutCustom>
        <LayoutCustom
          horizontal
          itemsCenter
          justify="center"
          mt={theme.margins.large}
        >
          <LayoutCustom alignSelfCenter style={styles.buttonContainer}>
            <IButton name={require(`../../../../assets/images/icons/ordenIcon.png`)} icon="wallet_send" title={`Informar\norden`} />
          </LayoutCustom>
          <LayoutCustom style={styles.buttonContainer}>
            <IButton name={require(`../../../../assets/images/icons/transferIcon.png`)} icon="document" title={`Solicitar\ntransferencia`} />
          </LayoutCustom>
        </LayoutCustom>
        {/* <LayoutCustom horizontal itemsCenter justify="space-between" mh={24}>
          <Text>Recent Activities</Text>
          <LayoutCustom horizontal itemsCenter gap={4}>
            <Text category="c1" status="primary">
              See All
            </Text>
            <AppIcon
              size={18}
              name={EvaIcons.ArrowRight}
              fill={theme["text-primary-color"]}
            />
          </LayoutCustom>
        </LayoutCustom> */}
        {/* <LayoutCustom gap={16} mt={24}>
          {Activities.map((item, index) => {
            return <ActivityItem item={item} key={index} />;
          })}
        </LayoutCustom> */}
      </Content>
    </Container>
  );
});

export default HomeScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1
  },
  img: {
    width: theme.image.big,
    height: theme.image.big
  },
  topNavigation: {
    paddingHorizontal: theme.paddings.medium,
  },
  moneyText: {
    color: theme.colors.skyBlue
  },
  buttonContainer: {
    width: '50%',
    padding: theme.paddings.medium
  },
  carouselStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.margins.small,
  }
});

const CARDS = [
  { color: "#009F9F", balance: 15245.9, card_number: "5282300014453286", icon: require('../../../../assets/images/icons/today-clock.png') },
  { color: "#D0682E", balance: 24245.9, card_number: "5282300014453286", icon: require('../../../../assets/images/icons/today-clock.png') },
  { color: "#701BC4", balance: 151245.9, card_number: "5282300014453286", icon: require('../../../../assets/images/icons/today-clock.png') },
];

const Activities = [
  {
    id: "1",
    title: "Netflix Membership",
    icon: "netflix",
    amount: -29.9,
    create_at: "31.05.2023",
  },
  {
    id: "2",
    title: "Turkcell Invoice",
    icon: "turkcell",
    amount: -242.05,
    create_at: "30.05.2023",
  },
  {
    id: "3",
    title: "Shopping Invoice",
    icon: "wallet_send",
    amount: -1242.05,
    create_at: "30.05.2023",
  },
  {
    id: "3",
    title: "Food Invoice",
    icon: "wallet_send",
    amount: -42.05,
    create_at: "27.05.2023",
  },
];
