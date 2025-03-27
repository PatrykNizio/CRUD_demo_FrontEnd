import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import AddProduct from './components/AddProduct.jsx';
import AddCompany from './components/AddCompany.jsx'; 
import EditCompany from './components/EditCompany.jsx';
import EditProduct from './components/EditProduct.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-company" element={<AddCompany />} />
        <Route path="/edit/:id" element={<EditCompany />} />
        <Route path="/edit-product/:productId" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
