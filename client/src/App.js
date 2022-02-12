import './App.css';
import { Route } from 'react-router-dom';
import PrivateRoute from './components/utils/PrivateRoute';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import Search from './components/search/Search';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { AuthProvider } from './hooks/AuthContext'
import Setting from './components/auth/Setting';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Navbar/>
                <Route path="/" component={Landing} exact/>
                <Route path="/login" component={Login} exact/>
                <Route path="/register" component={Register} exact/>
                <PrivateRoute path="/dashboard" component={Dashboard} exact/>
                <PrivateRoute path="/search" component={Search} exact/>
                <PrivateRoute path="/settings" component={Setting} exact/>
                <Footer/>
            </div>
        </AuthProvider>
    );
}

export default App;
