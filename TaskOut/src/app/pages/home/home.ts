import { Component, TemplateRef, ViewChild, NgModule } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Registro {
  motivo: string;
  inicio: Date;
  fim: Date;
  duracao: number; // em horas
  usuario: string;
  data: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  registros: Registro[] = [];
  novoRegistro = {
    motivo: '',
    inicio: '',
    fim: '',
    usuario: '',
  };

  filtroMotivo: string = '';
  filtroUsuario: string = '';

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  constructor(private modalService: NgbModal) {}

  openModal() {
    this.novoRegistro = {
      motivo: '',
      inicio: '',
      fim: '',
      usuario: '',
    };
    this.modalService.open(this.modalTemplate);
  }

  adicionarRegistro(modal: any) {
    const inicio = new Date(this.novoRegistro.inicio);
    const fim = new Date(this.novoRegistro.fim);

    const duracaoEmHoras = (fim.getTime() - inicio.getTime()) / 3600000;

    const novo: Registro = {
      motivo: this.novoRegistro.motivo,
      inicio,
      fim,
      duracao: parseFloat(duracaoEmHoras.toFixed(2)),
      usuario: this.novoRegistro.usuario,
      data: inicio.toLocaleDateString('pt-BR'),
    };

    this.registros.push(novo);
    modal.close();
  }

  removerRegistro(registro: Registro) {
    this.registros = this.registros.filter((r) => r !== registro);
  }

  registrosFiltrados(): Registro[] {
    return this.registros.filter(
      (r) =>
        r.motivo.toLowerCase().includes(this.filtroMotivo.toLowerCase()) &&
        r.usuario.toLowerCase().includes(this.filtroUsuario.toLowerCase())
    );
  }
}
