import React, { useState } from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  CheckBox,
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
  const [checked, setChecked] = useState(false)

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
        <LayoutCustom ph={theme.paddings.medium}>

          <LayoutCustom
            // itemsCenter
            horizontal
            justify="space-between"
          // margin={24}
          // padding={theme.paddings.medium}
          >
            <Text>Total general</Text>
            <Text>AR$1.456.789,000</Text>
          </LayoutCustom>
          <LayoutCustom
            itemsCenter
            horizontal
            justify="space-between"
            mt={theme.margins.medium}
          // margin={24}
          // padding={theme.paddings.medium}
          >
            <Text>Mis instrumentos</Text>
            <LayoutCustom horizontal alignSelfCenter itemsCenter justify="space-between">
              <Text marginRight={theme.margins.small}>Agrupar</Text>
              <CheckBox
                checked={checked}
                onChange={setChecked}
              />
            </LayoutCustom>
          </LayoutCustom>
        </LayoutCustom>
        <LayoutCustom ph={theme.paddings.large}>
          <LayoutCustom horizontal justify="space-between" pv={theme.paddings.xSmall} mt={theme.margins.medium} style={{ width: '100%' }}>
            <LayoutCustom style={{ minWidth: '20%' }}>
            </LayoutCustom>
            <LayoutCustom alignSelfCenter style={{ width: '25%' }}>
              <Text>Nombre</Text>
            </LayoutCustom>
            <LayoutCustom alignSelfCenter itemsCenter style={{ width: '25%' }}>
              <Text>Valor</Text>
            </LayoutCustom>
            <LayoutCustom style={{ width: '30%', alignItems: 'flex-end' }}>
              <Text>Total</Text>
              <Text>Cantidad</Text>
            </LayoutCustom>
          </LayoutCustom>
        </LayoutCustom>
        <LayoutCustom ph={theme.paddings.medium}>
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
    // flex: 1,
    // paddingBottom: 0,
  },
  topNavigation: {
    paddingHorizontal: theme.paddings.medium,
  },
  content: {

  },
});

const SAMPLE = [{ title: "" }];
