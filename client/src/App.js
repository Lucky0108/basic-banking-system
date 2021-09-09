import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Transactions from './Components/Transactions';
import Customers from './Components/Customers';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
     <Navbar />
     <Switch>
       <Route exact path="/" component={Home} />
       <Route exact path="/transactions" component={Transactions} />
       <Route exact path="/customers" component={Customers} />
     </Switch>
     <Footer />
    </div>
  );
}

export default App;
