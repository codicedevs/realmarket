// import { Stack } from 'expo-router/stack'

// export default function Layout() {
// 	return <Stack />
// }

// import { Tabs } from 'expo-router/tabs';

// export default function AppLayout() {
//   return (
//     <Tabs>
//       <Tabs.Screen
//         // Name of the route to hide.
//         name="index"
//         options={{
//           // This tab will no longer show up in the tab bar.
//           href: "/home",
//         }}
//       />
//     </Tabs>
//   );
// }

import { Drawer } from 'expo-router/drawer'

export default function Layout() {
	return (
		<Drawer>
			<Drawer.Screen
				name="index" // This is the name of the page and must match the url from root
				options={{
					drawerLabel: 'Home',
					title: 'overview',
				}}
			/>
			<Drawer.Screen
				name="user/[id]" // This is the name of the page and must match the url from root
				options={{
					drawerLabel: 'User',
					title: 'overview',
				}}
			/>
		</Drawer>
	)
}
