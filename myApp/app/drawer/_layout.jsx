import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"/>

        <Drawer.Screen name="setting" options={{
            title:"setting",
            drawerLabel:"Zeel"
        }}/>
    </Drawer>
  );
}
