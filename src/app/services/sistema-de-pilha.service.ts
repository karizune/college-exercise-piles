import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SistemaDePilhaService {

  //variaveis
  parenteseAberto:number;
  errorMessage:string;
  pilha = [];
  constructor() { }

  inserirNaPilha(valor:string){
    this.pilha.push(valor);
    console.log(valor);
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
        this.errorMessage = "parenteses fechando sem ter uma aberto";
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
}
