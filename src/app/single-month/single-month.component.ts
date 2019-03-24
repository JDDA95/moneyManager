import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConexionService } from '../services/conexion.service';
import { Payments } from '../payments.model';

@Component({
  selector: 'app-single-month',
  templateUrl: './single-month.component.html',
  styleUrls: ['./single-month.component.scss']
})
export class SingleMonthComponent implements OnInit {
  paymentsList:Payments[];
  titleMonth:String;
  constructor(private route:ActivatedRoute,private monthsService: ConexionService) {
    
  }

  ngOnInit() {
    this.titleMonth = this.route.snapshot.paramMap.get("title");
    var id = this.route.snapshot.paramMap.get("id");
    var x = this.monthsService.getPayments(id);
    x.snapshotChanges().subscribe(item=>{
      this.paymentsList = [];
      item.forEach(element=>{
        var y = element.payload.toJSON();
        this.paymentsList.push(y as Payments)
      })
    })
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

}
