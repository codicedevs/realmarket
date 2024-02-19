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
  RoundedButton,
  Text
} from "components";
import TransactionItem, { ITransactionItemProps } from "./TransactionItem";
// ----------------------------- Types ----------------------------------------
// ----------------------------- Reanimated 2 -----------------------
import { useSharedValue } from "react-native-reanimated";
// ----------------------------- Navigation -----------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CurrencyToggle from "components/Switch";
import { Modal, Pressable } from "react-native";
import theme from "theme";
import { FinanceStackParamList } from "types/navigation-types";
import BalanceCard from "./BalanceCard";

const Finance07 = React.memo(() => {
  const { goBack } = useNavigation()
  const styles = useStyleSheet(themedStyles);
  const { width } = useLayout();
  const time_now = new Date().getHours();
  const [selectedTransaction, setSelectedTransaction] = useState<ITransactionItemProps | {}>({})
  const [open, setOpen] = useState(false)
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

  const selectTransaction = (data: ITransactionItemProps) => {
    setSelectedTransaction(data)
    setOpen(true)
  }

  const progressValue = useSharedValue(0);

  return (
    <>
      <Modal
        animationType="fade"
        visible={open}
        transparent={true}
        onRequestClose={() => setOpen(false)}
      >
        <LayoutCustom style={styles.centeredView}>
          <LayoutCustom style={styles.modalView}>
            <LayoutCustom mb={theme.margins.large}>
              <Text marginBottom={theme.margins.medium} fontSize={20} style={styles.modalText}>Detalle del movimiento</Text>
              <Text category="subhead" marginBottom={theme.margins.xSmall} fontSize={16} style={styles.modalText}> Fecha:</Text>
              <Text marginBottom={theme.margins.xSmall} fontSize={18} style={styles.modalText}>11/01/23</Text>
              <Text category="subhead" marginBottom={theme.margins.xSmall} fontSize={16} style={styles.modalText}>Importe:</Text>
              <Text marginBottom={theme.margins.xSmall} fontSize={18} style={styles.modalText}>$30000</Text>
              <Text marginBottom={theme.margins.xSmall} style={styles.modalText}>CAUCION TOMADORA</Text>
            </LayoutCustom>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setOpen(false)}
            >
              <Text style={styles.textStyle}>Volver</Text>
            </Pressable>
          </LayoutCustom>
        </LayoutCustom>
      </Modal>
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
          <LayoutCustom mt={theme.margins.large} mb={theme.margins.small}>
            <LayoutCustom alignSelfCenter mb={theme.margins.medium}>
              <CurrencyToggle changeCurrency={setCurrency} />
            </LayoutCustom>
            <BalanceCard balance={233004.91} grow={12.2} />
          </LayoutCustom>
          <LayoutCustom overflow="scroll" gap={15} mh={theme.margins.medium}>
            {SAMPLE_TRANSACTION.map((transaction, index) => {
              return <TransactionItem data={transaction} key={index} selectTransaction={selectTransaction} />;
            })}
          </LayoutCustom>
        </Content>
      </Container>
    </>
  );
});

export default Finance07;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    paddingHorizontal: theme.paddings.medium,
  },
  content: {
    overflow: 'scroll'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 25,
    padding: 15,
    elevation: 2,
    paddingHorizontal: theme.paddings.large
  },
  buttonClose: {
    backgroundColor: '#009F9F',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
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
