##How to force element into focus

Verify that the element has focus att.
create a template ref in the html. let's say its name is inp <input #inp>

```ts
  @ViewChild('inp') inputEle: any; 

    ngAfterViewChecked(){
      if(this.inputEle){
           this.inputEle.nativeElement.focus();
      }
```
