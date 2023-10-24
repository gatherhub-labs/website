import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './AppContext'
import ConnexionPage from './components/ConnexionPage'
import Home from './components/Home'

function App() {

  return (
        <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/website" element={<ConnexionPage />} />
            <Route path="/website/home" element={<Home />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
  )
}

export default App

