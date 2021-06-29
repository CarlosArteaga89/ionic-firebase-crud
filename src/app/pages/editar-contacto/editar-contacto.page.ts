import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Contact} from '../../shared/Contact';
import {ContactService} from '../../services/contact.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.page.html',
  styleUrls: ['./editar-contacto.page.scss'],
})
export class EditarContactoPage implements OnInit {

  validations: FormGroup;
  contactId: any;
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
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public fb: FormBuilder
  ) {
    this.contactId = this.route.snapshot.paramMap.get('key');
    this.contactService.getContact(this.contactId).valueChanges().subscribe(res => {
      this.validations.setValue(res);
    });
  }

  ngOnInit() {
    this.validations = this.fb.group({
      name: [''],
      email: [''],
      mobile: ['']
    });
    console.log(this.validations.value);
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


  async editarContacto() {
    this.presentarLoading();
    this.contactService.updateContact(this.contactId, this.validations.value).then(
      () => {
        this.loading.dismiss();
        this.presentarToast('Guardado con Exito');
        this.router.navigate(['/contactos']);
      }
    ) .catch(err => {
      console.log(err);
      this.presentarToast('No se pudo Guardar');
    });
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
