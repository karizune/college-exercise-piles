import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SistemaDePilhaService } from '../services/sistema-de-pilha.service';
import { cards } from '../../assets/cards';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {

  formulario = this.fb.group({
    expression: ['']
  });

  formAdicionarPilha = this.fb.group({
    item:['']
  })

  Card:object;
  NaipeCarta:string;
  valorCarta:string;
  Cards = cards;
  itens:boolean = true;
  valorRemovido:string;
  expressao:string;
  Pilha = [];

  constructor(
    private fb: FormBuilder,
    private service: SistemaDePilhaService
  ) {}

  ngOnInit(): void {
    this.resetar();
  }

  transformAsArray(){
    let array = [];
    this.expressao = this.formulario.get('expression').value;
    for(let i = 0; i < this.expressao.length; i++){
      array.push(this.expressao[i]);
    }
    this.service.pegarExpressao(array);
    this.atualizaVetor();
  }

  adicionarNaPilha(){
    this.service.inserirNaPilha(this.formAdicionarPilha.get('item').value);
    this.atualizaVetor();
  }

  removerDaPilha(){
    this.valorRemovido = this.service.removerDaPilha();
    this.atualizaVetor();
  }

  atualizaVetor(){
    this.Pilha = [];
    let pilha = this.service.getPilha();
    if(pilha.length == 0){
      this.itens = true;
    }
    else{
      this.itens = false;
    }
    for(let i = 0; i< pilha.length; i++){
      this.Pilha.push(pilha[i]);
    }
  }

  AtualizaDadosCarta(){
    this.service.AtualizaDadosCarta();
    this.NaipeCarta = this.service.NaipeCarta;
    this.valorCarta = this.service.valorCarta;
    this.Card = this.service.Card;
  }

  resetar(){
    this.Card = {
      "Url":"./assets/deck/blue_back.png"
    };
    this.itens = true;
    this.NaipeCarta = "Sem Naipe";
    this.valorCarta = "Sem Valor";
    this.Cards = cards;
    this.Pilha = [];
    this.service.resetar();
  }
}
