import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { Produit } from '../models/produit';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public loginClient(login: string, password: string): Observable<Client> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'login=' + login + '&password=' + password;
    return this.http.post<Client>(
      environment.backendLoginClient,
      data,
      httpOptions
    );
  }

  public registerClient(client: Client): Observable<Client> {
    return this.http.post<Client>(environment.backendRegisterClient, client);
  }

  public getClientInfo(): Observable<Client> {
    return this.http.get<Client>(environment.backendClientInfo);
  }

  public updateClientInfo(client: Client): Observable<Client> {
    return this.http.put<Client>(environment.backendUpdateClient, client);
  }

  public getCalague(): Observable<Produit[]> {
    return this.http.get<Produit[]>(environment.backendCatalogue);
  }
}
