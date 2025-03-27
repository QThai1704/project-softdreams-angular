import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private uploadFileUrl = 'http://localhost:8081/api/v1/upload-file';

  constructor(private http: HttpClient) { }


  uploadFile(folder: string, file: File): Observable<any>{
    const formData = new FormData();
    formData.append('folder', folder); // Thêm tham số folder
    formData.append('file', file, file.name);
    return this.http.post(this.uploadFileUrl, formData);
  }

}
