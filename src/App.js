import './App.css';
import { YMaps } from '@pbe/react-yandex-maps';
import MapContainer from './components/Map';

function App() {
  return (
    <YMaps>
      <MapContainer />
    </YMaps>
  );
}

export default App;
