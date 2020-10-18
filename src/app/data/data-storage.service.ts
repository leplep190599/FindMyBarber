import {Injectable} from '@angular/core';
import {any} from 'codelyzer/util/function';
import {HttpClient} from '@angular/common/http';
import {UserDto} from '../dto/user-dto.model';
import {LoginDto} from '../dto/login-dto.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    loginUser: UserDto;
    constructor(private  http: HttpClient) {
    }

    setUser(user) {
        this.loginUser = user;
        console.log(this.loginUser);
    }
    getUser(): UserDto {
        return this.loginUser;
    }

    fetchAllUsers() {
        return this.http.get('https://isalon-server.herokuapp.com/api/v1/getAllUser');
    }
    fetchAllStores() {
        return this.http.get('https://isalon-server.herokuapp.com/api/v1/getAllStore');
    }
    getUserByID(id) {
        return this.http.get('https://isalon-server.herokuapp.com/api/v1/getUser/' + id);
    }

    getStoreByOwnerId(id: number) {
        return this.http.get('https://isalon-server.herokuapp.com/api/v1/getStore/' + id);
    }

    createAccount(data: UserDto) {
        return this.http.post<any>('https://isalon-server.herokuapp.com/api/v1/newUser', data);
    }

    updateAccount(data: any) {
        return this.http.put<any>('https://isalon-server.herokuapp.com/api/v1/updateUser', data);
    }

    updateStore(data: any) {
        return this.http.put<any>('https://isalon-server.herokuapp.com/api/v1/updateStore', data);
    }
    createStore(data: any) {
        return this.http.post<any>('https://isalon-server.herokuapp.com/api/v1/newStore', data);
    }

    deleteUser(id: number) {
        return this.http.delete<any>('https://isalon-server.herokuapp.com/api/v1/deleteUser/' + id);
    }
    deleteStore(id: number) {
        return this.http.delete<any>('https://isalon-server.herokuapp.com/api/v1/deleteStore/' + id);
    }

    login(dto: LoginDto) {
        return this.http.post<any>('https://isalon-server.herokuapp.com/api/v1/login', dto);
    }


}
