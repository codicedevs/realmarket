import React, { useState } from "react";
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
  Text
} from "components";
import CurrencyToggle from "components/Switch";
import { Switch } from "react-native";
import theme from "theme";
import { FinanceStackParamList } from "types/navigation-types";
import ActionCard from "./ActionsCard";
import { sample_coin } from "./data";

const Finance08 = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const { navigate } = useNavigation<NavigationProp<FinanceStackParamList>>();
  const [currency, setCurrency] = useState('ARS')

  return (
    <Container style={styles.container}>
      <TopNavigation
        alignment="center"
        title="Posiciones"
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
        <LayoutCustom mt={theme.margins.large} mb={theme.margins.medium} alignSelfCenter>
          <CurrencyToggle changeCurrency={setCurrency} />
        </LayoutCustom>
        <LayoutCustom
          itemsCenter
          horizontal
          justify="space-between"
          margin={24}
        >
          <Text>Total general</Text>
          <Text>AR$1.456.789,000</Text>
        </LayoutCustom>
        <LayoutCustom
          itemsCenter
          horizontal
          justify="space-between"
          margin={24}
        >
          <Text>Mis instrumentos</Text>
          <LayoutCustom horizontal alignSelfCenter itemsCenter>
            <Text>Agrupar</Text>
            <Switch />
          </LayoutCustom>
        </LayoutCustom>
        <LayoutCustom>
          {sample_coin.map((coin, index) => {
            return <ActionCard data={coin} index={index} key={index} />;
          })}
        </LayoutCustom>
      </Content>
    </Container>
  );
});

export default Finance08;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    paddingHorizontal: 16,
  },
  content: {
  },
});

const SAMPLE = [{ title: "" }];
