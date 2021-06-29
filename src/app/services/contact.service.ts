import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {Contact} from '../shared/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactListRef: AngularFireList<any>;
  contactRef: AngularFireObject<any>;

  constructor(
    private db: AngularFireDatabase
  ) {
  }

  crearteContact(contacto: Contact) {
    return this.contactListRef.push({
      name: contacto.name,
      email: contacto.email,
      mobile: contacto.mobile
    });
  }

  getContact(id: string) {
    this.contactRef = this.db.object('/contactos/' + id);
    return this.contactRef;
  }

  // Get Contacts
  getContacts() {
    this.contactListRef = this.db.list('/contactos');
    return this.contactListRef;
  }

  // Update
  updateContact(id, contacto: Contact) {
    return this.contactRef.update({
      name: contacto.name,
      email: contacto.email,
      mobile: contacto.mobile
    });
  }

  // Delete
  deleteContact(id: string) {
    this.contactRef = this.db.object('/contactos/' + id);
    return this.contactRef.remove();
  }
}
