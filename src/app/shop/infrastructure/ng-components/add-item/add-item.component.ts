import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
   selector: 'app-add-item',
   standalone: true,
   imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
   templateUrl: './add-item.component.html',
   styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

   form: FormGroup;

   constructor(private fb: FormBuilder) { }

   ngOnInit(): void {
      this.formInit();
   }

   formInit() {
      this.form = this.fb.group({
         name: ['', Validators.required],
         description: ['', Validators.required],
         price: ['', Validators.required],
      });
   }

   saveItem() {
      console.info('saveItem');
   }
}
