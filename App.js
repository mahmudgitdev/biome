import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {Provider} from './src/context/FavoriteContext';
export default function App() {
  return(
  <Provider>
    <AppNavigation></AppNavigation>
  </Provider>
  )
}
