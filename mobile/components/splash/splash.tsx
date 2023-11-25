import { StyleSheet, Text, View } from 'react-native'

import SplashGradient from './linear-gradient'

export default function Splash() {
	return (
		<SplashGradient>
			<View style={styles.container}>
				{/* replace with hq logo */}
				<Text style={{ color: '#f1f1f1' }}>REAL MARKET</Text>
			</View>
		</SplashGradient>
	)
}

const styles = StyleSheet.create({
	container: {
		margin: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
