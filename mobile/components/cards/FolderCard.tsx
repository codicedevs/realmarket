import { Icon, StyleService } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Text, View } from 'react-native'
import { useInfo } from '../../context/InfoProvider'
import { financial } from '../../types/financial.types'
import theme from '../../utils/theme'
import LayoutCustom from '../LayoutCustom'
import TotalCard from './TotalCard'
import TransactionCards, { IPosition } from './TransactionCards'
const windowHeight = Dimensions.get("window").width;

const FolderCard = ({ title, data, selectAsset }: { title: string, data: IPosition[], selectAsset: (data: IPosition) => void }) => {
  const [open, setOpen] = useState(false)
  const itemHeight = 60
  const { currencyPositions } = useInfo()

  const renderItem = ({ item, index }) => (
    <View style={{ height: itemHeight }}>
      <TransactionCards data={item} index={index} selectAsset={selectAsset} />
    </View>
  );


  const totalAmount = () => {
    const total = data.reduce((acc, cur) => {
      var suma: number
      if (cur.monedaCotizacion === 'USDB') {
        suma = (cur.cantidadPendienteLiquidar + cur.cantidadLiquidada) * currencyPositions.usdPriceBcra
      } else if (cur.monedaCotizacion === 'USD' || cur.monedaCotizacion === 'USDC') {
        suma = (cur.cantidadPendienteLiquidar + cur.cantidadLiquidada) * currencyPositions.usdPrice
      } else {
        suma = ((cur.cantidadPendienteLiquidar + cur.cantidadLiquidada) * cur.precioUnitario)
      }
      return acc + suma;
    }, 0);

    return ({
      total: total,
      simboloLocal: 'TOTAL',
    });

  };

  useEffect(() => {
    totalAmount()
  }, [])

  const toggle = () => {
    setOpen(!open)
  }
  return (
    <>
      {
        data.length !== 0 &&
        <LayoutCustom horizontal justify='space-between' style={themedStyles.container} onPress={toggle}>
          <Text style={themedStyles.text}>{financial[title]}</Text>
          <Icon
            name={open ? 'chevron-up-outline' : 'chevron-down-outline'}
            style={{ width: 20, height: 20 }}
          />
        </LayoutCustom>
      }
      {
        open &&
        <>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            getItemLayout={(data, index) => (
              { length: itemHeight, offset: itemHeight * index, index }
            )}
            showsVerticalScrollIndicator={false}
            initialNumToRender={20}
            removeClippedSubviews={true}
            windowSize={10}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
          />
          {
            data.length > 0 &&
            <TotalCard data={totalAmount()} index={data.length} />
          }
        </>
      }
    </>
  )
}

export default FolderCard

const themedStyles = StyleService.create({
  text: {
    color: 'white',
    fontFamily: 'Lato-Regular'
  },
  container: {
    marginVertical: theme.margins.xSmall,
    borderRadius: 5,
    padding: theme.paddings.small,
    backgroundColor: theme.colors.skyBlue
  }
});
