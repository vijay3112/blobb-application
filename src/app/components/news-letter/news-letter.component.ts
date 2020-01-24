import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Props } from '../../constants/props';
import { AppSubscribe } from '../../entities/AppSubscribe';
import { LoadService } from '../../constants/load.service';
import { WelcomeService } from '../../pages/welcome-page/welcome.service';

@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.css']
})
export class NewsLetterComponent implements OnInit {
  DetailsForm: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  Props: any = Props;
  @Input()
  newsSubscribe: AppSubscribe;
  @Input()
  type: string;
  startLoading: boolean = false;
  displayedColumns: string[] = ["email"];
  constructor(private formBuilder: FormBuilder, private loadService: LoadService, private service: WelcomeService) {
    this.newsSubscribe = new AppSubscribe();
    this.DetailsForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],

    });
  }
  ngOnInit() {
  }
  submit() {
    this.startLoading = true;
    this.service.subscribeSave(this.newsSubscribe).subscribe((data: any) => {
      if (data) {
        console.log(data);
        // this.search();
        this.service.showMessage(data.message);
        this.DetailsForm.reset();
        // this.close1(true);
      }
      this.startLoading = false;
    });
  }

}
