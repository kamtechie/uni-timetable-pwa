import { set, del } from 'idb-keyval';

export const auth = {
    isAuthenticated: false,
    authenticate(cb, id) {
        set('identifier', id);
        setTimeout(cb, 100);
        auth.isAuthenticated = true;
        console.log("authed")
    },
    signout(){
        del('identifier');
        auth.isAuthenticated = false;
        console.log('signed out')
    }
}