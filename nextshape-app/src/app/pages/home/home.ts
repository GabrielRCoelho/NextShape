import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  index = 0;
  temporizador: any;

  images = [
    "assets/images/academia.jpg",
    "assets/images/academia2.jpg",
    "assets/images/academia3.jpg"
  ];

  constructor(
    private zone: NgZone, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.iniciarCarrossel();
  }

  ngOnDestroy() {
    this.pararCarrossel();
  }

  iniciarCarrossel() {
    // Rodamos o intervalo dentro da 'Zone' do Angular para ele vigiar as mudanças
    this.zone.runOutsideAngular(() => {
      this.temporizador = setInterval(() => {
        this.zone.run(() => {
          this.proximoBanner();
        });
      }, 5000);
    });
  }

  pararCarrossel() {
    if (this.temporizador) clearInterval(this.temporizador);
  }

  proximoBanner() {
    this.index = (this.index + 1) % this.images.length;
    console.log("Banner atualizado para o índice:", this.index);
    this.cdr.detectChanges(); // Força a renderização
  }

  mudarBanner(idx: number) {
    this.index = idx;
    this.pararCarrossel();
    this.iniciarCarrossel();
    this.cdr.detectChanges();
  }

  // Função auxiliar para evitar strings complexas no HTML
  getEstiloBanner() {
    return `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${this.images[this.index]}')`;
  }
}