import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-track-upload',
  templateUrl: './track-upload.component.html',
  styleUrls: ['./track-upload.component.scss']
})
export class TrackUploadComponent {
    @ViewChild('fileUpload') fileUploadElementRef?: ElementRef;

    submittable: boolean = true;

    constructor(private readonly dialogRef: MatDialogRef<TrackUploadComponent>,
                private readonly httpClient: HttpClient) {
    }
    public onSubmit(form: NgForm) {
        this.submittable = false;
        let files = this.fileUploadElementRef?.nativeElement.files;
        if (files) {
            let fileData = files[0];
            let formData = new FormData();
            formData.append('artist', form.value.artist);
            formData.append('title', form.value.title);
            formData.append('file', fileData);
            this.httpClient.post('http://roxteddy.noip.me:3000/song', formData).subscribe({
                next: () => {
                    this.dialogRef.close();
                },
                error: (e: HttpErrorResponse) => {
                    this.submittable = true;
                    alert(`Error ${e.status}: ${e.message}`);
                }
            });
        }
    }
}
