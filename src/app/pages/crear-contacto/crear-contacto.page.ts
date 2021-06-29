import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import {Router} from '@angular/router';
import {Contact} from '../../shared/Contact';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-crear-contacto',
  templateUrl: './crear-contacto.page.html',
  styleUrls: ['./crear-contacto.page.scss'],
})
export class CrearContactoPage implements OnInit {

  validations: FormGroup;

  loading: any;
  toast: any;

  validationmessages = {
    name: [
      { type: 'required', message: 'Ingrese el nombre del contacto.' },
      { type: 'minlength', message: 'El nombre debe tener 5 caracteres como minimo.' },
      { type: 'maxlength', message: 'El nombre debe tener 25 caracteres como maximo.' },
    ],
    mobile: [
      { type: 'required', message: 'El celular es obligatorio.' },
      { type: 'minlength', message: 'El celular debe tener 10 caracteres.' },
      { type: 'maxlength', message: 'El celular debe tener 10 caracteres.' },
      { type: 'pattern', message: 'El celular debe contener solo numeros.' }
    ],
    email: [
      { type: 'required', message: 'El correo es obligatorio.' },
      { type: 'pattern', message: 'Este no es un formato de correo valido.' },
    ],
  };

  constructor(
    private contactService: ContactService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.validations = this.fb.group({
      name: [''],
      email: [''],
      mobile: ['']
    });
    this.validations = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.required
      ])),
      mobile: new FormControl('', Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('[0-9]+'),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z0-9_.+-\u00F1\u00D1]+@[a-zA-Z0-9_.+-\u00F1\u00D1]+.[a-zA-Z0-9_.+-\u00F1\u00D1]+$'),
        Validators.required
      ])),
    });
  }

  crearContacto(){
    this.presentarLoading();
    if (!this.validations.valid) {
      return false;
    } else {
      this.contactService.crearteContact(this.validations.value).then( cont => {
        console.log(cont);
        this.loading.dismiss();
        this.presentarToast('Contacto Guardado');
        this.validations.reset();
        this.router.navigate(['/contactos']);
      }) .catch(err => {
        console.log(err);
        this.presentarToast('No se ha podido guardar');
      });
    }
  }

  async presentarLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'normal',
      message: 'Guardando...!'
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

  onSubmit(values) {
    console.log(values);
  }
}
