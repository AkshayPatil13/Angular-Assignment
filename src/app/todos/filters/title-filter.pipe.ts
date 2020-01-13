import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleFilter'
})
export class TitleFilterPipe implements PipeTransform {

  transform(value: any, filterString:string): any {
    if(value.length <= 0 || filterString == ''){
      return value;
    }
    let resultArray = [];
    console.log(value);
    for(let item of value){
      if(item['title'].toLowerCase().includes(filterString.toLowerCase())){
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
