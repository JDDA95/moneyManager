import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Months } from '../months.model';
import { Payments } from '../payments.model';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  monthsList: AngularFireList<any>;
  paymentsList: AngularFireList<any>;
  constructor(private firebase:AngularFireDatabase){}

  getMonths(){
    this.monthsList = this.firebase.list('/months');
    return this.monthsList;
  }

  getPayments(monthID){
    this.paymentsList = this.firebase.list('/months/'+monthID+'/payments')
    return this.paymentsList
  }

  insertMonth(month: Months){
    this.monthsList.push({
      base:month.base,
      title:month.title,
      payments:month.payments,
      saving:month.saving
    })
  }

  insertPayment(pay: Payments){
    this.monthsList.push({
      date:pay.date,
      pay:pay.pay,
      title:pay.title,
    })
  }


}
