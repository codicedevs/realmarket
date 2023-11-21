import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default function Container({ children }: { children: React.ReactNode }) {
	return <ScrollView style={styles.container}>{children}</ScrollView>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
