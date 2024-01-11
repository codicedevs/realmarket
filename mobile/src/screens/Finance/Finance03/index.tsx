import React from "react";
// ----------------------------- UI kitten -----------------------------------
import { Divider, IndexPath, Select, SelectItem, StyleService, TopNavigation, useStyleSheet, useTheme } from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from "@react-navigation/native";
// ----------------------------- Types ---------------------------------------
import EvaIcons from "types/eva-icon-enum";
// ----------------------------- Components && Elements -----------------------
import { AppIcon, Container, Content, LayoutCustom, Text } from "components";
import Chart from "./Chart";
import ActivityItem from "./ActivityItem";

const Finance03 = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();

  const [selectedData, setSelectedData] = React.useState<IndexPath>(
    new IndexPath(0)
  );
  const [selectedMonth, setSelectedMonth] = React.useState<IndexPath>(
    new IndexPath(0)
  );

  const displaySelect = SAMPLE_DATA[selectedData.row].title;
  const displaySelectMonth = ACTIVITIES[selectedMonth.row].title;

  const handleSelect = (index: IndexPath | IndexPath[]) => {
    if (Array.isArray(index)) {
      // Handle multiple indices
    } else {
      // Handle single index
      setSelectedData(index);
    }
  };
  const handleSelectMonth = (index: IndexPath | IndexPath[]) => {
    if (Array.isArray(index)) {
      // Handle multiple indices
    } else {
      // Handle single index
      setSelectedMonth(index);
    }
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        alignment="center"
        title={() => <Text status="grey">Account Details</Text>}
        style={styles.topNavigation}
        accessoryLeft={() => (
          <LayoutCustom style={styles.buttonNav} onPress={goBack}>
            <AppIcon
              name={EvaIcons.ArrowLeft}
              fill={theme["text-primary-color"]}
            />
          </LayoutCustom>
        )}
        accessoryRight={() => (
          <LayoutCustom style={styles.buttonNav}>
            <AppIcon
              name={EvaIcons.QuestionMarkCircle}
              fill={theme["text-primary-color"]}
            />
          </LayoutCustom>
        )}
      />
      <Content contentContainerStyle={styles.content}>
        <LayoutCustom gap={12}>
          <LayoutCustom horizontal itemsCenter justify="space-between">
            <Text category="subhead">Account Number</Text>
            <Text category="subhead">6894352</Text>
          </LayoutCustom>
          <LayoutCustom horizontal itemsCenter justify="space-between">
            <Text category="subhead">Remaining Debt</Text>
            <Text category="subhead">₺ 4,850.00</Text>
          </LayoutCustom>
          <LayoutCustom horizontal itemsCenter justify="space-between">
            <Text category="subhead">Cut-off date</Text>
            <Text category="subhead">25.02.2021</Text>
          </LayoutCustom>
          <Divider />
        </LayoutCustom>
        <LayoutCustom>
          <Text status="grey">Balance</Text>
          <LayoutCustom horizontal itemsCenter mt={8} justify="space-between">
            <Text status="primary" category="t3">
              ₺ 15,560.00
            </Text>
            <Select
              selectedIndex={selectedData}
              onSelect={handleSelect}
              style={styles.select}
              value={displaySelect}
              status="placeholder"
              size="tiny"
            >
              {SAMPLE_DATA.map((item, index) => {
                return (
                  <SelectItem
                    title={() => <Text category="c1">{item.title}</Text>}
                    key={index}
                  />
                );
              })}
            </Select>
          </LayoutCustom>
          <Chart data={SAMPLE_DATA[selectedData.row].data} />
        </LayoutCustom>
        <LayoutCustom gap={16}>
          <LayoutCustom horizontal itemsCenter justify="space-between">
            <Text status="grey">Activities</Text>
            <Select
              style={styles.select}
              selectedIndex={selectedMonth}
              onSelect={handleSelectMonth}
              size="tiny"
              value={displaySelectMonth}
              status="placeholder"
            >
              {ACTIVITIES.map((item, index) => {
                return (
                  <SelectItem
                    title={() => <Text category="c1">{item.title}</Text>}
                    key={index}
                  />
                );
              })}
            </Select>
          </LayoutCustom>
          {ACTIVITIES[selectedMonth.row].data.map((item, index) => {
            return <ActivityItem item={item} key={index} />;
          })}
        </LayoutCustom>
      </Content>
    </Container>
  );
});

export default Finance03;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    paddingHorizontal: 24,
  },
  content: {
    padding: 24,
    paddingBottom: 120,
    gap: 24,
    flexGrow: 1,
  },
  buttonNav: {
    borderWidth: 1,
    borderColor: "background-basic-color-4",
    backgroundColor: "background-basic-color-3",
    borderRadius: 16,
    padding: 12,
  },
  balance: {
    paddingTop: 16,
  },
  select: {
    minWidth: 96,
  },
});
const SAMPLE_DATA = [
  {
    title: "Apr - Aug",
    data: [
      { x: "Apr", y: 1993 },
      { x: "May", y: 2153 },
      { x: "Jun", y: 1235 },
      { x: "Jul", y: 994 },
      { x: "Aug", y: 1336 },
    ],
  },
  {
    title: "Oct - Feb",
    data: [
      { x: "Oct", y: 993 },
      { x: "Nov", y: 1653 },
      { x: "Dec", y: 1135 },
      { x: "Jan", y: 1414 },
      { x: "Feb", y: 1036 },
    ],
  },
];
const ACTIVITIES = [
  {
    title: "January",
    data: [
      {
        id: "0",
        title: "Bank Transfer",
        icon: "wallet",
        amount: 42.05,
        create_at: "02.06.2023",
      },
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
        id: "4",
        title: "Food Invoice",
        icon: "wallet_send",
        amount: -42.05,
        create_at: "27.05.2023",
      },
      {
        id: "5",
        title: "Bank Transfer",
        icon: "wallet",
        amount: +1342.05,
        create_at: "27.05.2023",
      },
    ],
  },
  {
    title: "February",
    data: [
      {
        id: "5",
        title: "Bank Transfer",
        icon: "wallet",
        amount: 342.05,
        create_at: "01.06.2023",
      },
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
    ],
  },
  {
    title: "March",
    data: [
      {
        id: "1",
        title: "Netflix Membership",
        icon: "netflix",
        amount: -29.9,
        create_at: "31.05.2023",
      },
      {
        id: "5",
        title: "Bank Transfer",
        icon: "wallet",
        amount: +142.05,
        create_at: "00.05.2023",
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
    ],
  },
  {
    title: "April",
    data: [
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
    ],
  },
  {
    title: "May",
    data: [
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
        id: "4",
        title: "Bank Transfer",
        icon: "wallet_send",
        amount: 542.05,
        create_at: "30.05.2023",
      },
      {
        id: "5",
        title: "Food Invoice",
        icon: "wallet_send",
        amount: -42.05,
        create_at: "27.05.2023",
      },
    ],
  },
  {
    title: "June",
    data: [
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
    ],
  },
  {
    title: "July",
    data: [
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
    ],
  },
  {
    title: "August",
    data: [
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
        amount: -442.05,
        create_at: "30.05.2023",
      },
      {
        id: "3",
        title: "Shopping Invoice",
        icon: "wallet_send",
        amount: -142.05,
        create_at: "30.05.2023",
      },
      {
        id: "3",
        title: "Food Invoice",
        icon: "wallet_send",
        amount: -12.05,
        create_at: "27.05.2023",
      },
    ],
  },
  {
    title: "September",
    data: [
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
        amount: -442.05,
        create_at: "30.05.2023",
      },
      {
        id: "3",
        title: "Shopping Invoice",
        icon: "wallet_send",
        amount: -2142.05,
        create_at: "30.05.2023",
      },
      {
        id: "3",
        title: "Food Invoice",
        icon: "wallet_send",
        amount: -32.05,
        create_at: "27.05.2023",
      },
    ],
  },
  {
    title: "October",
    data: [
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
        amount: -1242.05,
        create_at: "30.05.2023",
      },
      {
        id: "3",
        title: "Shopping Invoice",
        icon: "wallet_send",
        amount: -242.05,
        create_at: "30.05.2023",
      },
      {
        id: "3",
        title: "Food Invoice",
        icon: "wallet_send",
        amount: -22.05,
        create_at: "27.05.2023",
      },
    ],
  },
  {
    title: "November",
    data: [
      {
        id: "1",
        title: "Netflix Membership",
        icon: "netflix",
        amount: -49.9,
        create_at: "31.05.2023",
      },
      {
        id: "2",
        title: "Turkcell Invoice",
        icon: "turkcell",
        amount: -142.05,
        create_at: "30.05.2023",
      },
      {
        id: "3",
        title: "Shopping Invoice",
        icon: "wallet_send",
        amount: -1442.05,
        create_at: "30.05.2023",
      },
      {
        id: "3",
        title: "Food Invoice",
        icon: "wallet_send",
        amount: -52.05,
        create_at: "27.05.2023",
      },
    ],
  },
  {
    title: "December",
    data: [
      {
        id: "1",
        title: "Netflix Membership",
        icon: "netflix",
        amount: -129.9,
        create_at: "31.05.2023",
      },
      {
        id: "2",
        title: "Turkcell Invoice",
        icon: "turkcell",
        amount: -342.05,
        create_at: "30.05.2023",
      },
      {
        id: "3",
        title: "Shopping Invoice",
        icon: "wallet_send",
        amount: -1042.05,
        create_at: "30.05.2023",
      },
      {
        id: "3",
        title: "Food Invoice",
        icon: "wallet_send",
        amount: -122.05,
        create_at: "27.05.2023",
      },
    ],
  },
];
