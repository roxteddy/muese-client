import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-song-upload',
  templateUrl: './song-upload.component.html',
  styleUrls: ['./song-upload.component.scss']
})
export class SongUploadComponent {
    @ViewChild('fileUpload') fileUploadElementRef?: ElementRef;

    constructor(private readonly httpClient: HttpClient) {
    }
    public onSubmit(form: NgForm) {
        let files = this.fileUploadElementRef?.nativeElement.files;
        if (files) {
            let fileData = files[0];
            let formData = new FormData();
            formData.append('artist', form.value.artist);
            formData.append('title', form.value.title);
            formData.append('file', fileData);
            this.httpClient.post('http://roxteddy.noip.me:3000/song', formData).subscribe();
        }
    }
}
