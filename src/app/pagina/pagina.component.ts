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
    if(this.Cards.length == 0){
      this.Card = {
        "Url":"./assets/deck/purple_back.png"
      }
      this.NaipeCarta = "Sem Naipe";
      this.valorCarta = "Sem Valor";
      window.alert("Você já pegou todas as cartas");
    }else{
      this.Card = this.Cards.pop();
      if(this.Card['suit'] == "hearts"){
        this.NaipeCarta = "Copas";
      }
      else if(this.Card['suit'] == "diamonds"){
        this.NaipeCarta = "Ouros";
      }
      else if(this.Card['suit'] == "clubs"){
        this.NaipeCarta = "Paus";
      }
      else if(this.Card['suit'] == "spades"){
        this.NaipeCarta = "Espadas";
      }
      else{
        this.NaipeCarta = "Sem Naipe";
      }
      if(this.Card['value'] == "A"){
        this.valorCarta = "Ás";
      }
      else{
        this.valorCarta = this.Card['value'];
      }
    }
  }

  resetar(){
    this.Card = {
      "Url":"./assets/deck/blue_back.png"
    };
    this.NaipeCarta = "Sem Naipe";
    this.valorCarta = "Sem Valor";
    this.Cards = cards;
    this.Pilha = [];
  }
}
