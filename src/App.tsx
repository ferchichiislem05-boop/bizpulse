import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import Revenue from './pages/Revenue';
import Departments from './pages/Departments';
import Anomalies from './pages/Anomalies';
import Briefing from './pages/Briefing';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#070B18' }}>
        <Sidebar />
        <main style={{
          flex: 1,
          marginLeft: 240,
          padding: '36px 40px',
          minHeight: '100vh',
          overflowY: 'auto',
          maxWidth: 'calc(100% - 240px)',
          boxSizing: 'border-box',
        }}>
          <Routes>
            <Route path="/"            element={<Overview />}    />
            <Route path="/revenue"     element={<Revenue />}     />
            <Route path="/departments" element={<Departments />} />
            <Route path="/anomalies"   element={<Anomalies />}   />
            <Route path="/briefing"    element={<Briefing />}    />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
