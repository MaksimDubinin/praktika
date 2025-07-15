import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE,PRODUCT_ROUTE, PROFILE_PAGE, REGISTRATION_ROUTE, SHOP_ROUTE
} from "./utils/consts";
import RegistrationPage from "./pages/RegistrationPage";
import BasketPage from "./pages/BasketPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import Admin from "./pages/Admin";
import Home from "./pages/Home";


export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Home,
    },
    {
        path: LOGIN_ROUTE,
        Component: RegistrationPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    }
]

export const authRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Home,
    },
    {
        path: LOGIN_ROUTE,
        Component: RegistrationPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage
    },
    {
        path: BASKET_ROUTE,
        Component: BasketPage
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: PROFILE_PAGE,
        Component: ProfilePage
    }

]

export const adminRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Home,
    },
    {
        path: LOGIN_ROUTE,
        Component: RegistrationPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage
    },
    {
        path: BASKET_ROUTE,
        Component: BasketPage
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: PROFILE_PAGE,
        Component: ProfilePage
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    }
]
