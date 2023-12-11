import { NativeEventEmitter, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Button from '../components/button/button'
import {
	// useQuery,
	// useMutation,
	// useQueryClient,
	QueryClient,
	QueryClientProvider,
	QueryCache,
	MutationCache,
} from '@tanstack/react-query'

export const eventEmitter = new NativeEventEmitter()

export default function App() {
	const queryClient = new QueryClient({
		queryCache: new QueryCache({
			onSuccess: () => console.log('ok'),
			onError: () => console.log('error in every query'),
		}),
		mutationCache: new MutationCache({
			onSuccess: () => console.log('ok mutation'),
			onError: () => console.log('error mutation'),
		}),
	})

	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<View>
					<Text>Hello world</Text>
					<Button title="Hello world" onPress={() => {}} />
				</View>
			</SafeAreaProvider>
		</QueryClientProvider>
	)
}
