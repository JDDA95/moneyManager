import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConexionService } from '../services/conexion.service';
import { Payments } from '../payments.model';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginComponent } from '../login/login.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-month',
  templateUrl: './single-month.component.html',
  styleUrls: ['./single-month.component.scss'],
  providers: [LoginComponent]
})
export class SingleMonthComponent implements OnInit {
  paymentsList:Payments[];
  titleMonth:String;
  totalPays:any=0;
  payments: FormGroup;
  submitted:Boolean = false;
  success:Boolean = false;
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,private monthsService: ConexionService, private logFunc: LoginComponent,private toastr: ToastrService) {
  }
  
  ngOnInit() {
    this.payments = this.formBuilder.group({
      title: ['', Validators.required],
      pay: ['', [Validators.required]],
      date: ['', Validators.required]
    });
    this.getPays();
  }

  public viewInputs(inputChange): void {
    this.logFunc.viewInputs(inputChange);
  }

  getPays(){
    this.titleMonth = this.route.snapshot.paramMap.get("title");
    var id = this.route.snapshot.paramMap.get("id");
    var x = this.monthsService.getPayments(id);
    x.snapshotChanges().subscribe(item=>{
      this.paymentsList = [];
      item.forEach(element=>{
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.paymentsList.push(y as Payments)
      })
      this.paymentsList.forEach(element=>{
        this.totalPays += element.pay;
      })
    })
  }

  deletePay($key,payTitle) {
    this.monthsService.deletePay($key);
    this.totalPays = 0;
    this.getPays();
    this.toastr.success(`${payTitle} ha sido eliminado`,'¡Eliminado!');
  }

  openModal() {
    var modal:any = document.querySelector('.modal');
    modal.setAttribute('style', 'display:inline-flex;');
    var modal2 = document.getElementById('firstModal');
    window.onclick = function (event) {
      if (event.target == modal2) {
        modal.style.display = "none";
      }
    }
  }

  onSubmitPay() {
    this.submitted = true;
    if (this.payments.invalid) {
      return;
    }
    this.success = true;
    let paymentAdd = {
      date:this.payments.value.date,
      pay:+this.payments.value.pay,
      title:this.payments.value.title,
    }
    this.monthsService.insertPayment(paymentAdd);
    this.toastr.success(`${this.payments.value.title} ha sido agregado`,'¡Agregado!');
    this.payments.reset();
    this.submitted = false;
    this.success = false;
    var modal:any = document.querySelector('.modal');
    modal.style.display = "none";
  }

}
