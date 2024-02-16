import React, { useState } from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  TopNavigation,
  useStyleSheet
} from "@ui-kitten/components";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------

import { faker } from "@faker-js/faker";
import {
  Container,
  Content,
  LayoutCustom,
  RoundedButton
} from "components";
// ----------------------------- Types ----------------------------------------
// ----------------------------- Reanimated 2 -----------------------
import { useSharedValue } from "react-native-reanimated";
// ----------------------------- Navigation -----------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
import theme from "theme";
import { FinanceStackParamList } from "types/navigation-types";
import ActionCard from "./ActionsCards";

const ActionScreen = React.memo(() => {
  const { goBack } = useNavigation()
  const styles = useStyleSheet(themedStyles);
  const { width } = useLayout();
  const time_now = new Date().getHours();
  const [currency, setCurrency] = useState('ARS')
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
        <LayoutCustom style={{ height: '90%' }} justify="space-between">
          <LayoutCustom style={{ height: 150 }}>
            <ActionCard color="#009F9F" title="Emitir orden" />
          </LayoutCustom>
          <LayoutCustom style={{ height: 150 }}>
            <ActionCard color="#D0682E" title='Solicitar transferencia' />
          </LayoutCustom>
          <LayoutCustom style={{ height: 150 }}>
            <ActionCard color="#701BC4" title="Informar transferencia" />
          </LayoutCustom>
        </LayoutCustom>
      </Content>
    </Container>
  );
});

export default ActionScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    paddingHorizontal: theme.paddings.medium,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end'
  },
});

const SAMPLE_TRANSACTION = [
  {
    image: Images.finance.prime,
    title: "Venta",
    created_at: new Date(new Date().setHours(new Date().getHours())),
    amount: "-$5000",
    receivedBy: '[MRCAO]',
    total: "$1.345.000,00"
  },
  {
    image: Images.finance.nike,
    title: "Caución tomadora",
    created_at: new Date(new Date().setHours(new Date().getHours()) - 1),
    amount: "-$50.000",
    receivedBy: '2023065826',
    total: "1.350.000,00"
  },
  {
    title: faker.name.firstName("male"),
    created_at: new Date(new Date().setHours(new Date().getHours()) - 2),
    amount: "$50.000",
    total: "$1.400.000,00"
  },
  {
    title: 'Ret. gcias. s/CL',
    created_at: new Date(new Date().setHours(new Date().getHours()) - 4),
    amount: "$15000",
    total: "1.350.000,00"
  }
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
