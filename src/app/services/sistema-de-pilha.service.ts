import { Injectable } from '@angular/core';
import { cards } from './../../assets/cards';

@Injectable({
  providedIn: 'root'
})
export class SistemaDePilhaService {

  //variaveis
  parenteseAberto:number;
  errorMessage:string;
  pilha = [];
  Cards = cards;
  Card:object;  
  NaipeCarta:string;
  valorCarta:string;

  constructor() { }

  inserirNaPilha(valor:string){
    if(valor == ''){
      return window.alert("Não é possivel adicionar algo vazio");
    }
    else{
      this.pilha.push(valor);
    }
  }

  pegarExpressao(pilha){
    this.pilha = pilha;
    if(this.pilha.length != 0){
      if(this.verificaParenteses()){
        window.alert(this.errorMessage);
      }
      else{
        window.alert(this.errorMessage);
      }
    }
    else{
      window.alert("Sem Caracteres para verificar");
    }
  }

  removerDaPilha(){
    if(this.pilha.length > 0){
      return this.pilha.pop();
    }
    else{
      window.alert("Não é possível remover pois a pilha está vazia");
    }
  }

  verificaParenteses(){
    this.parenteseAberto = 0;
    let i;
    for(i = 0; i<this.pilha.length; i++){

      if(this.pilha[i] == ")" && this.parenteseAberto <= 0){
        this.errorMessage = "parenteses fechando sem ter um aberto";
        return false;
      }


      if(this.pilha[i] == "("){
        this.parenteseAberto++;
      }
      else if(this.pilha[i] == ")" && this.parenteseAberto > 0){
        this.parenteseAberto--;
      }
    }
    if(this.parenteseAberto > 0){
      this.errorMessage = "parenteses aberto sem ter fechamento";
      return false;
    }
    this.errorMessage = "A expressão está correta"; 
    return true;
  }

  getPilha(){
    return this.pilha;
  }

  AtualizaDadosCarta(){
    if(this.Cards.length == 0){
      this.Card = {
        "Url":"./assets/deck/purple_back.png"
      }
      this.NaipeCarta = "Sem Naipe";
      this.valorCarta = "Sem Valor";
      window.alert("Você já pegou todas as cartas");
    }
    else{
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
      else if(this.Card['value'] == 'K'){
        this.valorCarta = "Rei";
      }
      else if(this.Card['value'] == 'Q'){
        this.valorCarta = "Dama";
      }
      else if(this.Card['value'] == 'J'){
        this.valorCarta = "Valete";
      }
      else{
        this.valorCarta = this.Card['value'];
      }
      let carta = {
        "suit":this.NaipeCarta,
        "value":this.valorCarta,
        "Url":this.Card['Url']
      }
      console.log(carta)
    }
  }

  resetar(){
    this.parenteseAberto = null;
    this.errorMessage = '';
    this.pilha = [];
  }
}
