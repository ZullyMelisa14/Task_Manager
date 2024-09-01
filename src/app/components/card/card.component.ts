import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  //Inputs
  @Input() id: number = 0;
  @Input() task: string ="";
  @Input() description: string ="";
  isDone: boolean = false;
  

  @Output() doClick = new EventEmitter();
  @Output() updateEvent = new EventEmitter();
  @Output() handleDoneEvent = new EventEmitter();


  public doDelete(){
    this.doClick.emit(this.id);
  }

  public doUpdate(){
    this.updateEvent.emit({
      id: this.id,
      task: this.task,
      description: this.description,
    });
  }

  public toggleDone(){
    this.isDone = !this.isDone;
    this.handleDoneEvent.emit({
      isDone: this.isDone, 
      id: this.id
    })
  }
}
