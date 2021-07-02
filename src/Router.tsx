import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useUser } from './hooks/useUser';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import ProductListPage from './pages/product/List';
import UserListPage from './pages/user/List';
import UserModal from './pages/user/Modal';


export default function AppRouter() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    if (user?.id === undefined) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    };
  }, [user]);

  return (
    <BrowserRouter>
      {
        isAuth ? <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/products" exact component={ProductListPage} />
          <Route path="/users" component={UserListPage} />
          <Route path="/" component={HomePage} />
          <Redirect to="/login" />
        </Switch> : <Switch>
          <Route path="/login" component={LoginPage} />
        </Switch>
      }
    </BrowserRouter>
  );
};