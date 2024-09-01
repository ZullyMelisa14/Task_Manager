import {JsonPipe} from "@angular/common";
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {CardComponent} from "./components/card/card.component";

interface Task {
  id: number;
  task: string;
  description: string;
  done: boolean;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, JsonPipe, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task_manager';
  public activity: Task[] = [];
  public taskIdToUpdate: number | null = null;


  public task!: FormControl;
  public description!: FormControl;

  public form!: FormGroup;

  constructor(){
    this.initForm();
  }

  public registerTask(){
    if (this.taskIdToUpdate !== null){
      this.activity = this.activity.map((task, index) => {
        if (index == this.taskIdToUpdate){
          return {...this.form.value}
        }else{
          return task;
        }
      })
    }else {
      this.activity.push(this.form.value);
      console.log(this.activity);
    }
    this.taskIdToUpdate = null;
    this.form.reset();
  }

  public removeTask(id: number){
    console.log("🚀  ~ AppComponent ~ removeUser ~ id:", id);
    const newTask: Task[] = [];
    for (let i = 0; i <this.activity.length; i++){
      const element = this.activity[i];
      if(i !== id) {
        newTask.push(element);
      }
      this.activity = newTask;
    }
  }

  public updateTask(data: Task) {
    this.taskIdToUpdate = data.id;
    this.initForm(data.task, data.description);
  }

  //SRP --> Principio de unica responsabilidad
  private initForm(task?: string, description?:string){
    this.task = new FormControl(task || "",[Validators.required, Validators.minLength(3)]);
    this.description = new FormControl(description || "", [Validators.required, Validators.minLength(10)]);
    done: [false]

//Agrupar los Controladores
    this.form = new FormGroup( {
      task: this.task,
      description: this.description
    });
  }

  public updateDone(data: { id: number; isDone: boolean }) {
    this.activity = this.activity.map((task, index) => {
      if (index === data.id) {
        return { ...task, done: data.isDone };
      } else {
        return task;
      }
    });
    console.log(this.activity);
  }
}
