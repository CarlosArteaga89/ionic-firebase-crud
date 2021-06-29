import { Component, OnInit } from '@angular/core';
import {ContactService} from '../../services/contact.service';
import {Contact} from '../../shared/Contact';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {

  loading: any;
  contactos: Contact[];
  toast: any;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.listarContactos();
    const contactList = this.contactService.getContacts();
    contactList.snapshotChanges().subscribe( res => {
      this.contactos = [];
      res.forEach(item => {
          const a = item.payload.toJSON();
          a['$key'] = item.key;
          this.contactos.push(a as Contact);
        }
      );
    });
  }

  listarContactos(){
    this.presentarLoading();
    this.contactService.getContacts().valueChanges().subscribe( cont => {
      console.log(cont);
      this.loading.dismiss();
    });
  }

  async eliminarContacto(id){
    const alert = await this.alertCtrl.create({
      cssClass: 'tertiary',
      header: 'Eliminar',
      message: 'Desea <strong>eliminar</strong> el contacto..??',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Carcel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Eliminar Cancel: blah');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Eliminar Aceptar');
            this.contactService.deleteContact(id).then(res => {
              this.presentarToast('Eliminado con Exito');
              this.alertCtrl.dismiss();
            }).catch(error => {
              this.presentarToast('No se ha podido eliminar');
              this.alertCtrl.dismiss();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  /*eliminarContacto(id) {
    if (window.confirm('Do you really want to delete?')) {
      this.contactService.deleteContact(id);
    }
  }*/

  async presentarLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'normal',
      message: 'Cargardo...!'
    });
    await this.loading.present();
  }

  async presentarToast(msg: string) {
    this.toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000,
      cssClass: 'toast'
    });
    this.toast.present();
  }

  irCrearContacto(){
    this.router.navigate(['/crear-contacto']);
  }

  irEditarContacto(id: string){
    this.router.navigate(['/editar-contacto', id]);
  }

}
