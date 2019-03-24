import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';
import { Months } from '../months.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  monthsList:Months[];
  constructor(private monthsService: ConexionService) {}

  ngOnInit() {
    var x = this.monthsService.getMonths();
    x.snapshotChanges().subscribe(item=>{
      this.monthsList = [];
      item.forEach(element=>{
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.monthsList.push(y as Months)
      })
    })
  }

}
