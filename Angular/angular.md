# Angular

##how to force element into [focus](https://stackblitz.com/edit/angular-epj91y?file=src/app/select-overview-example.ts)
- verify that the element has focus att. 
- create a template ref in the html. let's say it's name is inp
```ts
  @ViewChild('inp') inputEle: any; 

    ngAfterViewChecked(){
      if(this.inputEle){
           this.inputEle.nativeElement.focus();
      }
```

