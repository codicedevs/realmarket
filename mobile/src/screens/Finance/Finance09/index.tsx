import React from "react";
import { Image, ImageBackground, Modal, SectionList } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet, Avatar, Icon, Spinner } from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from "@react-navigation/native";
// ----------------------------- Hooks ---------------------------------------
import { useLayout } from "hooks";
// ----------------------------- Types ---------------------------------------
import EvaIcons from "types/eva-icon-enum";
// ----------------------------- Assets ---------------------------------------
import { Images } from "assets/images";
// ----------------------------- Components && Elements -----------------------
import OptionBackground from "./OptionBackground";
import TransactionHistory from "./TransactionHistory";
import { AppIcon, Container, Content, LayoutCustom, NavigationAction, Text } from "components";
import { LinearGradient } from "expo-linear-gradient";
// ----------------------------- Utils ---------------------------------------
import { faker } from "@faker-js/faker";
import { formatDate } from "utils/formatDate";
import convertPrice from "utils/convertPrice";
import keyExtractoUtil from "utils/keyExtractorUtil";

const Finance09 = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();

  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [selectedBg, setSelectedBg] = React.useState(0);

  const ProductItem = ({
    product,
  }: {
    product: {
      title: string;
      image: any;
      color: string[];
    };
  }) => {
    return (
      <LayoutCustom
        level="1"
        overflow="hidden"
        border={16}
        style={{ width: width - 32 }}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0.5, y: 2 }}
          colors={product.color}
          style={styles.linear}
        />
        <LayoutCustom margin={16} horizontal justify="space-between">
          <LayoutCustom>
          <Text status="grey" maxWidth={width - 32 - 80}>
            {product.title}
          </Text>
          <LayoutCustom horizontal itemsCenter gap={8} mt={12}>
          <Text category='c1' status='grey'>{'Expolore now'}</Text>
          <AppIcon name={EvaIcons.ArrowCircleRight} size={16}/>
          </LayoutCustom>
          </LayoutCustom>
          <Image source={product.image} style={{ width: 80, height: 80 }} />
        </LayoutCustom>
      </LayoutCustom>
    );
  };

  const Option = ({ item }: { item: { title: string; icon: string } }) => {
    return (
      <LayoutCustom
        gap={8}
        style={{ width: width / 5 - 16 }}
        itemsCenter
        justify="center"
      >
        <Icon pack="assets" name={item.icon} style={styles.iconOption} />
        <Text category="c2" status="grey" center numberOfLines={2}>
          {item.title}
        </Text>
      </LayoutCustom>
    );
  };

  return (
    <ImageBackground
      source={{uri:OPTIONS[selectedBg]}}
      onLoadStart={() => {
        setLoading(true);
      }}
      onLoadEnd={() => {
        setLoading(false);
      }}
      style={{ width: width, height: height, flex: 1 }}
    >
      {loading ? (
        <LayoutCustom style={styles.backgroundLoading}>
          <Spinner size="giant" />
        </LayoutCustom>
      ) : (
        <Container style={styles.container}>
          <Content contentContainerStyle={styles.content}>
            <TopNavigation
              style={styles.topNavigation}
              appearance="control"
              accessoryRight={() => (
                <LayoutCustom horizontal itemsCenter gap={12}>
                  <NavigationAction
                    icon={EvaIcons.ImageOutline}
                    status="white"
                    onPress={() => {
                      setVisible(true);
                    }}
                  />
                  <NavigationAction
                    icon={EvaIcons.BellOutline}
                    status="white"
                  />
                </LayoutCustom>
              )}
              accessoryLeft={() => (
                <NavigationAction icon={EvaIcons.Menu2} status="white" />
              )}
            />
            <LayoutCustom
              style={styles.balance}
              level="1"
              horizontal
              itemsCenter
              gap={12}
            >
              <Avatar source={Images.avatar.avatar_04} size="small" />
              <LayoutCustom gap={4}>
                <Text category="c1" status="placeholder">
                  Current balance
                </Text>
                <Text>{convertPrice(data_sample.balance)}</Text>
              </LayoutCustom>
            </LayoutCustom>
            <LayoutCustom
              horizontal
              level="1"
              mh={16}
              justify="space-between"
              padding={12}
              border={16}
            >
              {options.map((item, index) => {
                return <Option item={item} key={index} />;
              })}
            </LayoutCustom>
            <Content horizontal contentContainerStyle={styles.contentProduct}>
              {PRODUCTS.map((product, index) => {
                return <ProductItem product={product} key={index} />;
              })}
            </Content>
            <LayoutCustom level="1" mh={16} pv={32} ph={16} border={16}>
              <LayoutCustom horizontal itemsCenter justify="space-between">
                <Text status="grey" category="subhead">
                  Transaction History
                </Text>
                <Text status="primary" category="subhead" underline>
                  See More
                </Text>
              </LayoutCustom>
              <SectionList
                renderSectionHeader={({ section: { title } }) => (
                  <Text category="body" status='grey' marginBottom={24} marginTop={24}>
                    {formatDate(new Date(title))}
                  </Text>
                )}
                sections={sample_transaction}
                keyExtractor={keyExtractoUtil}
                renderItem={({ item }) => (
                  <TransactionHistory transaction={item} />
                )}
              />
            </LayoutCustom>
          </Content>
        </Container>
      )}
      <Modal visible={visible}>
        <Container>
          <TopNavigation
            alignment="center"
            title={"Select Background"}
            accessoryLeft={() => (
              <NavigationAction
                icon={EvaIcons.CloseOutline}
                onPress={() => {
                  setVisible(false);
                }}
              />
            )}
          />
          <Content>
            <LayoutCustom
              mt={40}
              wrap
              horizontal
              justify="flex-start"
              mh={16}
              gap={12}
            >
              {OPTIONS.map((item, index) => {
                return (
                  <OptionBackground
                    src={item}
                    active={index === selectedBg}
                    key={index}
                    onSelect={() => {
                      setSelectedBg(index);
                      setVisible(false)
                    }}
                  />
                );
              })}
            </LayoutCustom>
          </Content>
        </Container>
      </Modal>
    </ImageBackground>
  );
});

export default Finance09;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingBottom: 0,
  },
  content: {
    gap: 32,
    paddingBottom: 80,
  },
  topNavigation: {
    paddingHorizontal: 16,
  },
  balance: {
    alignSelf: "flex-end",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 80,
    marginTop: -12,
  },
  iconOption: {
    tintColor: "text-grey-color",
    width: 24,
    height: 24,
  },
  backgroundLoading: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: 40,
  },
  contentProduct: {
    paddingHorizontal: 16,
    gap: 8,
  },
  linear: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const sample_transaction = [
  {
    title: new Date(),
    data: [
      {
        title: faker.name.fullName(),
        balance: -320,
        describe: "Money transfer",
        creatAt: new Date(),
      },
      {
        title: faker.name.fullName(),
        balance: 12320,
        describe: "Money transfer",
        creatAt: new Date(),
      },
      {
        title: faker.name.fullName(),
        balance: -1320,
        describe: "Money transfer",
        creatAt: new Date(),
      },
      {
        title: faker.name.fullName(),
        balance: -320,
        describe: "Money transfer",
        creatAt: new Date(),
      },
      {
        title: faker.name.fullName(),
        balance: -4320,
        describe: "Money transfer",
        creatAt: new Date(),
      },
      {
        title: faker.name.fullName(),
        balance: 120320,
        describe: "Money transfer",
        creatAt: new Date(),
      },
      {
        title: faker.name.fullName(),
        balance: -1320,
        describe: "Money transfer",
        creatAt: new Date(),
      },
    ],
  },
  {
    title: new Date(new Date().setDate(new Date().getDate() - 1)),
    data: [
      {
        title: faker.name.fullName(),
        balance: -320,
        describe: "Money transfer",
        creatAt: new Date().setDate(new Date().getDate() - 1),
      },
      {
        title: faker.name.fullName(),
        balance: 12320,
        describe: "Money transfer",
        creatAt: new Date().setDate(new Date().getDate() - 1),
      },
      {
        title: faker.name.fullName(),
        balance: -1320,
        describe: "Money transfer",
        creatAt: new Date().setDate(new Date().getDate() - 1),
      },
      {
        title: faker.name.fullName(),
        balance: -320,
        describe: "Money transfer",
        creatAt: new Date().setDate(new Date().getDate() - 1),
      },
      {
        title: faker.name.fullName(),
        balance: -4320,
        describe: "Money transfer",
        creatAt: new Date().setDate(new Date().getDate() - 1),
      },
      {
        title: faker.name.fullName(),
        balance: 120320,
        describe: "Money transfer",
        creatAt: new Date().setDate(new Date().getDate() - 1),
      },
      {
        title: faker.name.fullName(),
        balance: -1320,
        describe: "Money transfer",
        creatAt: new Date().setDate(new Date().getDate() - 1),
      },
    ],
  },
];

const data_sample = {
  balance: 4211234.4832,
};
const options = [
  { title: "Accounts & Cards", icon: "wallet" },
  { title: "Transfer Money", icon: "transfer" },
  { title: "Scan\nQR", icon: "qr" },
  { title: "Cardless Withdrawal", icon: "wallet_send" },
  { title: "Discover Products", icon: "bank" },
];
const PRODUCTS = [
  {
    title: "Earn up to $10000 when referring new business",
    image: Images.finance.money_bag,
    color: ["#FB735550", "#FBAF5550", "#FBE05550"],
  },
  {
    title: "Earn up to $10000 when referring new business",
    image: Images.finance.money_bag,
    color: ["#D0FB5550", "#6CFB5550", "#55FB8D50"],
  },
  {
    title: "Earn up to $10000 when referring new business",
    image: Images.finance.money_bag,
    color: ["#55FBF150", "#5597FB50", "#555CFB50"],
  },
];
const OPTIONS = [
  'https://images.pexels.com/photos/2400843/pexels-photo-2400843.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=1" srcset="https://images.pexels.com/photos/2400843/pexels-photo-2400843.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=1 1x, https://images.pexels.com/photos/2400843/pexels-photo-2400843.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=2 2x',
  "https://images.pexels.com/photos/4594027/pexels-photo-4594027.jpeg",
  "https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg",
  "https://images.pexels.com/photos/1494067/pexels-photo-1494067.jpeg",
  'https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  "https://images.pexels.com/photos/917494/pexels-photo-917494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];
