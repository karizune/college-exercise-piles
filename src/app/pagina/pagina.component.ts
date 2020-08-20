import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SistemaDePilhaService } from '../services/sistema-de-pilha.service';

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

  itens:boolean = true;
  valorRemovido:string;
  expressao:string;
  Pilha = [];

  constructor(
    private fb: FormBuilder,
    private service: SistemaDePilhaService
  ) {}

  ngOnInit(): void {
    this.atualizaVetor();
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
  // mostrarValoresDaPilha(){
  //   this.pilha = [];
  //   this.pilha = this.service.pilha;
  //   console.log(this.pilha);

  // }

}
