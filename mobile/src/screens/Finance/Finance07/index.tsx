import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  useTheme,
  Avatar,
} from "@ui-kitten/components";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------

import {
  AppIcon,
  Container,
  Content,
  LayoutCustom,
  NavigationAction,
  RoundedButton,
  Text,
} from "components";
import CreditCard from "./CreditCard";
import TransactionItem from "./TransactionItem";
import { faker } from "@faker-js/faker";
import ServiceItem from "./ServiceItem";
// ----------------------------- Types ----------------------------------------
import EvaIcons from "types/eva-icon-enum";
// ----------------------------- Reanimated 2 -----------------------
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
// ----------------------------- Navigation -----------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FinanceStackParamList } from "types/navigation-types";
import BalanceCard from "./BalanceCard";

const Finance07 = React.memo(() => {
  const {goBack}=useNavigation()
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { width } = useLayout();
  const time_now = new Date().getHours();
  const _intro = () => {
    if (time_now >= 0 && time_now < 12) {
      return "Good Morning!";
    } else if (time_now == 12) {
      return "Good Noon!";
    } else if (time_now >= 12 && time_now <= 17) {
      return "Good Afternoon!";
    } else {
      return "Good Evening!";
    }
  };
  const notification = 5;

  const { navigate } = useNavigation<NavigationProp<FinanceStackParamList>>();

  const progressValue = useSharedValue(0);

  return (
    <Container style={styles.container}>
       <TopNavigation
        alignment="center"
        title="Disponibilidad"
        style={styles.topNavigation}
        accessoryLeft={() => (
          <RoundedButton
            icon="arrow-left"
            onPress={() => navigate("FinanceIntro")}
          />
        )}
        accessoryRight={() => <RoundedButton icon="bell" />}
      />
      <Content contentContainerStyle={styles.content}>
        <LayoutCustom mt={40}>
          <LayoutCustom alignSelfCenter>
        <Text fontSize={26} marginBottom={15} category="t1" >Movimientos</Text>
          </LayoutCustom>
        <BalanceCard balance={233004.91} grow={12.2} />
        </LayoutCustom>
        <LayoutCustom  gap={24} mh={24}>
          <LayoutCustom horizontal justify="space-between" itemsCenter>
            {/* <Text category="t5">Recent Transactions</Text> */}
            <LayoutCustom horizontal itemsCenter>
              {/* <Text category="body" status="primary">
                See All
              </Text>
              <AppIcon
                name={EvaIcons.ChevronRight}
                fill={theme["text-primary-color"]}
              /> */}
            </LayoutCustom>
          </LayoutCustom>
          {SAMPLE_TRANSACTION.map((transaction, index) => {
            return <TransactionItem data={transaction} key={index} />;
          })}
        </LayoutCustom>
      </Content>
    </Container>
  );
});

export default Finance07;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    paddingHorizontal: 24,
  },
  notification: {
    position: "absolute",
    top: 2,
    right: 4,
    width: 17,
    height: 17,
    borderRadius: 99,
    backgroundColor: "color-danger-active",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
  },
  carousel: {
    width: "100%",
    justifyContent: "center",
    marginTop: 15,
    alignItems: "center",
  },
});

const SAMPLE_TRANSACTION = [
  {
    image: Images.finance.prime,
    title: "Prime Membership",
    created_at: new Date(new Date().setHours(new Date().getHours())),
    amount: 1230,
  },
  {
    image: Images.finance.nike,
    title: "Nike Store",
    created_at: new Date(new Date().setHours(new Date().getHours()) - 1),
    amount: -4230,
  },
  {
    title: faker.name.firstName("male"),
    created_at: new Date(new Date().setHours(new Date().getHours()) - 2),
    amount: 11230,
  },
  {
    title: faker.name.firstName("female"),
    created_at: new Date(new Date().setHours(new Date().getHours()) - 4),
    amount: -5230,
  },
];

const SAMPLE_SERVICE = [
  { icon: "qr", title: "Scan & Pay" },
  { icon: "income", title: "Send Money" },
  { icon: "outcome", title: "Receive Money" },
  { icon: "wallet_fill", title: "Wallet" },
];

const SAMPLE_CARD = [
  {
    image: Images.finance.creditcard_01,
    number: "1234",
    balance: 123223,
    exp_time: "09/25",
  },
  // {
  //   image: Images.finance.creditcard_02,
  //   number: "1234",
  //   balance: 123223,
  //   exp_time: "09/25",
  // },
  // {
  //   image: Images.finance.creditcard_03,
  //   number: "1234",
  //   balance: 123223,
  //   exp_time: "09/25",
  // },
];
