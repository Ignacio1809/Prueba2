import { Injectable } from '@angular/core';
//importar en el service al Storage del angular
import { Storage } from '@ionic/storage'
 

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  dato:any;

  constructor(private storage: Storage) { 
    //crear el storage para el usuario
    this.init();
  }

  //crear el storage
  async init()
  {
    await this.storage.create()
  }

  //ingresar datos al storage con id
  //async agregarConId(id: string, valor : string){
  //  await this.storage.set(id, valor);}

  //ingresar datos al storage con id autoincrementandose
  async agregar(valor: any){
    let id = await this.storage.length() + 1;
    await this.storage.set(id.toString(), valor);
  }

  async buscar(rut: string)
  {
    this.dato = null;
    await this.storage.forEach((v,k) => {    
      if(v[0].rut==rut)
      {        
        this.dato = v;
        return;
      }
    });
  }

  listar(){
    let listado = []
    this.storage.forEach((v,k) => {listado.push(v);})
    return listado;
  }

  eliminar(id: string){
    this.storage.remove(id)
  }



}
