import { LinearGradient } from 'expo-linear-gradient'
import * as React from 'react'
import { StyleSheet } from 'react-native'

export default function SplashGradient({ children }: { children: React.ReactNode }) {
	return (
		<LinearGradient style={styles.container} colors={['#0F054E', '#152D85', '#3314F6']}>
			{children}
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
