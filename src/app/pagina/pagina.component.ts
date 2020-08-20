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
  pilha = [];

  constructor(
    private fb: FormBuilder,
    private service: SistemaDePilhaService
  ) {}

  ngOnInit(): void {
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
  }

  removerDaPilha(){
    this.valorRemovido = this.service.removerDaPilha();
  }

  mostrarValoresDaPilha(){
    this.pilha = this.service.getPilha();
    if(this.pilha.length == 0){
      this.itens = true;
      this.pilha = [];
    }
    else{
      this.itens = false;
    }
  }

}
