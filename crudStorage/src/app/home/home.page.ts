import { Component } from '@angular/core';
import { CrudService } from '../crud.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  rut : string;
  nombre : string;
  apellido : string;
  telefono : string;
  listado=[];
  constructor(private crud: CrudService,
              private toast: ToastController) { }

  async agregar(txtRut: HTMLInputElement, txtNombre: HTMLInputElement, txtApellido: HTMLInputElement, txtTelefono: HTMLInputElement) 
  {
    if(txtRut.value.trim().length == 0)
    {
      const toast = await this.toast.create({
        message: 'Debe especificar el rut.',
        duration: 3000,
        position: "middle",
        color: "danger"
      });
      toast.present();

    }
    else if(txtNombre.value.trim().length == 0)
    {
      const toast = await this.toast.create({
        message: 'Debe especificar el nombre.',
        duration: 3000,
        position: "middle",
        color: "danger"
      });
      toast.present();

    }
    else if(txtTelefono.value.trim().length == 0)
    {
      const toast = await this.toast.create({
        message: 'Debe especificar el fono.',
        duration: 3000,
        position: "middle",
        color: "danger"
      });
      toast.present();
    }
    else
    {

    // crear formato para almacenar todos estos datos
      const datos = [{"rut": txtRut.value, "nombre": txtNombre.value, "apellido": txtApellido.value,  "fono": txtTelefono.value }];
      this.crud.agregar(datos);
      txtRut.value = "";
      txtNombre.value = "";
      txtApellido.value = "";
      txtTelefono.value = "";
      const toast = await this.toast.create({
        message: 'Los datos fueron guardados.',
        duration: 2000,
        position: "middle",
        color: "primary"
      });
      toast.present();
    }
  }

  async buscar(txtRut:HTMLInputElement){
    await this.crud.buscar(txtRut.value);

    if(this.crud.dato == null)
    {
      const toast = await this.toast.create({
        message: 'El rut ingresado no existe',
        duration: 3000,
        position: "middle",
        color: "danger"
      });
      toast.present();
      this.rut="";
    }
    else
    {      
      this.rut = this.crud.dato[0].rut;
      this.nombre = this.crud.dato[0].nombre;
      this.apellido = this.crud.dato[0].apellido;
      this.telefono = this.crud.dato[0].fono;
    }
    this.listado = [];
    txtRut.value = ""; 
    
  }

}
