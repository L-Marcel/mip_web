import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useUser } from './hooks/useUser';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProductListPage from './pages/product/List';
import UserListPage from './pages/user/List';
import JobsListPage from './pages/jobs/List';

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
          <Route path="/products" exact component={ProductListPage} />
          <Route path="/jobs" exact component={JobsListPage} />
          <Route path="/users" exact component={UserListPage} />
          <Route path="/" component={HomePage} />
          <Redirect to="/"/>
        </Switch> : <Switch>
          <Route path="/register" component={RegisterPage} />
          <Route path="/" component={LoginPage} />
          <Redirect to="/"/>
        </Switch>
      }
    </BrowserRouter>
  );
};