import { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AboutUsPage from '../AboutUsPage/AboutUsPage';
import HomePage from '../HomePage/HomePage';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import MenuAppBar from '../../components/MenuAppBar/MenuAppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import * as Orders from '../../utilities/orders-api'

const theme = createMuiTheme();

export default function App() {
  const [user, setUser] = useState(getUser());
  const [cart, setCart] = useState();

  useEffect(() => {
    if (user) {
      async function getCart() {
        const currentCart = await Orders.getCart();
        setCart(currentCart);
      }
      getCart();
    }
  },[user]);


  const changeWidgetQuantity = async (widgetId, newQuantity) => {
    console.log(widgetId);
    console.log(newQuantity);
    const updatedCart = await Orders.addToCart(widgetId, newQuantity)
    setCart(updatedCart);
  }

  const checkOrders = async (widgetId, newQuantity) => {
    const orders = await Orders.getConfirmation()
    console.log(orders); 
  }

  return (
    <MuiThemeProvider theme={theme}>
      <main className="App">
        { user ?
            <>
              <MenuAppBar user={user} setUser={setUser} />
              <Switch>
                <Route path="/aboutus">
                  <AboutUsPage />
                </Route>
                <Route path="/homepage">
                  <HomePage />
                </Route>
                <Route path="/orders/new">
                  <NewOrderPage changeWidgetQuantity={changeWidgetQuantity} />
                </Route>
                <Route path="/orders">
                  <OrderHistoryPage  />
                </Route>
                <Redirect to="/homepage" />
              </Switch>
            </>
          :
            <AuthPage setUser={setUser}/>
        }
      </main>
    </MuiThemeProvider>
  );
}
