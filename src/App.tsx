import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './AppContext'
import ConnexionPage from './components/ConnexionPage'
import Home from './components/Home'

function App() {

  return (
        <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/frontend" element={<ConnexionPage />} />
            <Route path="/frontend/home" element={<Home />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
  )
}

export default App

