import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './AppContext'
import ConnexionPage from './components/ConnexionPage'
import Home from './components/Home'
import DriveAPIQuickstart from './components/DriveAPIQuickStart'

function App() {

  return (
        <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/website" element={<ConnexionPage />} />
            <Route path="/website/home" element={<Home />} />
            <Route path="/website/drive" element={<DriveAPIQuickstart />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
  )
}

export default App

