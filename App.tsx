import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { AppRoutes } from '@/routes/appRoutes';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AppRoutes />
    </>
  );
}

