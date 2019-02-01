import {Component, OnInit} from '@angular/core';
import {FileUploadService} from "../services/file-upload.service";

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css']
})
export class UploadBookComponent implements OnInit {

  types = ['handbook', 'digital'];
  bookType: string;
  fileToUpload: File = null;

  constructor(private fileUploadService: FileUploadService) {
  }

  fielSize;
  chankSize = .1 * 1024 * 1024;


  ngOnInit() {
  }

  changeBookType(type) {
    this.bookType = type.value;
  }


  // handleChunk(file, chunkSize, chunksCount, chunkIndex, fileId, itemImg) {
  //   const id = fileId;
  //   const offset = chunkIndex * chunkSize;
  //   let chunk;
  //   if (file.size <= chunkSize) {
  //     chunk = file;
  //   } else {
  //     chunk = file.slice(offset, chunkSize + offset);
  //   }
  //   this.createFileSrc(chunk)
  //     .then((base64: any) => {
  //       chunkIndex++;
  //       const data = {
  //         number: chunkIndex,
  //         // file: base64.split('base64,')[1]
  //         file: base64
  //       };
  //       const promiseChunk = this.dataService.appendChunkBuffer(data, id).toPromise();
  //       promiseChunk.then(res => {
  //         this.preloaderWidth = chunkIndex / chunksCount * 100;
  //         if (chunkIndex < chunksCount) {
  //           this.handleChunk(file, chunkSize, chunksCount, chunkIndex, id, itemImg);
  //         } else {
  //           this.dataService.getChunkBuffer(res.id)
  //             .subscribe(resBuffer => {
  //               console.log(resBuffer);
  //               this.loadingFlag = false;
  //               this.loadingFlagVideo = false;
  //               this.preloaderWidth = 0;
  //               if (this.mediaType === 'video') {
  //                 this.videos[0].video.chunkBufferId = resBuffer.id;
  //                 this.videoUrl = resBuffer.preview;
  //                 this.previewVideos = [{
  //                   video_url: resBuffer.preview
  //                 }];
  //               } else {
  //                 if (!itemImg.image) {
  //                   itemImg.rotate = 1;
  //                   itemImg.weight = this.currentIndex;
  //                   itemImg.image = {};
  //                 }
  //                 itemImg.image_url = resBuffer.preview;
  //                 itemImg.image.chunkBufferId = resBuffer.id;
  //               }
  //             });
  //         }
  //       })
  //         .catch(err => {
  //           console.error('Somthing went wrong', err);
  //         });
  //     })
  //     .catch(err => {
  //       console.error('Somthing went wrong', err);
  //     });
  // }

  addBook(value) {
    console.log(value.value);

    // this.uploadFileToActivity();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    console.log(this.fileToUpload);
  }

  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
