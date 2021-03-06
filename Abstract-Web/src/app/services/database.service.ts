import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument ,AngularFirestoreCollection} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import {Work} from '../work';
import {Msg} from 'src/app/msg';
import { Observable } from 'rxjs'
import 'firebase/database';
import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

   /* work*/
 public workCollections: AngularFirestoreCollection<Work>; // holds a connection the firebase WorksInfo table
 public work: Work; // Holds work info that were inserted in the form by the user
 listingWorkDoc: AngularFirestoreDocument<any>; //holds FB listing for update operation
 observableWorks: Observable<Work[]>; //A temp variable that returns metadata. used by worksList
 worksList = []; // holds a list with listing id's and worls info of the WorkInfo table
 listingDoc: AngularFirestoreDocument<Work>; //holds FB listing for update operation

  /* Msg*/
  public MsgCollections: AngularFirestoreCollection<Work>;
  public msg: Msg;
  observableMsgs: Observable<Msg[]>; //A temp variable that returns metadata. used by worksList
  MsgsList = []; // holds a list with listing id's and works info of the WorksInfo table



  constructor(private afs: AngularFirestore) {
    this.workCollections = afs.collection<any>('workInfo');
    this.MsgCollections = afs.collection<any>('messages');
   }

  //adds all info that was provided through the work-upload form to work object and ads it to the firebase DB
  public addWorkToDB(work: Work) {
    this.workCollections.add(JSON.parse(JSON.stringify(work)));
  }

  public addMsgToDB(msg: Msg) {
    this.MsgCollections.add(JSON.parse(JSON.stringify(msg)));
  }
    // Updates a work listing by a given email. the object that is passed to the update function has to be already with the wanted changes!!! (It writes a new object)
    updateWorkListing(work_name: string) {
      for (var i = 0; i < this.worksList.length; i++) {
        if (this.worksList[i].title == work_name) {
           this.listingDoc = this.workCollections.doc(`${this.worksList[i].id}`); //takes the listing that will be updated by the doc.id (listing's id)
          this.listingDoc.update(JSON.parse(JSON.stringify(this.work)));
        }
      }
    }

    
    getWorkMetaData() { //Returns the DB table meta data from firebase including all table fields
      this.observableWorks = this.workCollections.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Work;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
      return this.observableWorks;
    }


    getMsgMetaData() { //Returns the DB table meta data from firebase including all table fields
      this.observableMsgs = this.MsgCollections.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Msg;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
      return this.observableMsgs;
    }
  
  
      //deletes work listing by a given title
  deleteWorkListing(title: string) {
    for (var i = 0; i < this.worksList.length; i++) {
      if (this.worksList[i].title == title) {
        this.listingDoc = this.workCollections.doc(`${this.worksList[i].id}`); //takes the listing that will be deleted by the doc.id (listing's id)
        this.listingDoc.delete();
      }
    }
  }

}

