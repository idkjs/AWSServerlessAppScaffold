export class SecuredRoutes {

    static Root = '';
    static Home = 'home';
    static UserLogin = 'login';
    static UserRegister = 'register';
    static AppConfig = 'config';

    static Secured = [SecuredRoutes.Root, SecuredRoutes.Home, SecuredRoutes.AppConfig];
    static Public = [SecuredRoutes.UserLogin, SecuredRoutes.UserRegister];

}
