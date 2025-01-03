import { Component } from '@angular/core';
import { Produit } from '../../models/produit';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent implements OnInit {
  produits$!: Observable<Produit[]>;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    if(localStorage.getItem('token') != null) {
      this.produits$ = this.apiService.getCalague();
    }
  }

  onClick() {
    this.produits$ = this.apiService.getCalague();
  }
}
