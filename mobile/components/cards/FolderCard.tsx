import { Icon, StyleService } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Text } from 'react-native'
import { financial } from '../../types/financial.types'
import theme from '../../utils/theme'
import LayoutCustom from '../LayoutCustom'
import TransactionCards, { IPosition } from './TransactionCards'

const FolderCard = ({ title, data, currency }: { title: string, data: IPosition[], currency: string }) => {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(!open)
  }
  return (
    <>
      <LayoutCustom horizontal justify='space-between' style={themedStyles.container} onPress={toggle}>
        <Text style={themedStyles.text}>{financial[title]}</Text>
        <Icon
          name='chevron-down-outline'
          style={{ width: 20, height: 20 }}
        />
      </LayoutCustom>
      {
        open ?
          data.map((d, index) => {
            return <TransactionCards data={d} index={index} key={index} currency={currency} />
          })
          :
          null
      }
    </>
  )
}

export default FolderCard

const themedStyles = StyleService.create({
  text: {
    color: 'white',
  },
  container: {
    marginVertical: theme.margins.xSmall,
    borderRadius: 5,
    padding: theme.paddings.small,
    backgroundColor: theme.colors.skyBlue
  }
});