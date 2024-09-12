

export function textDecoder(text: string): string {

    let replaceText =
        text.replace(/\[B\]/g, "<b>")
            .replace(/\[\/B\]/g, "</b>")
            .replace(/\[I\]/g, "<i>")
            .replace(/\[\/I\]/g, "</i>")
            .replace(/\[U\]/g, "<u>")
            .replace(/\[\/U\]/g, "</u>")
            .replace(/\[S\]/g, "<s>")
            .replace(/\[\/S\]/g, "</s>")

    return replaceText
}

export function textEncoder(textAreaInputdata: string, type:string, start:number, end:number): string {
    if(start=== end){
        let text = textAreaInputdata;
        if(type === "Bold"){
            text += " [B][/B] "
        }else if(type === "Italics"){
            text += " [I][/I] "
        }else if(type === "UnderLine"){
            text += " [U][/U] "
        }else if(type === "Crossed"){
            text += " [S][/S] "
        }
        return  text;
    }else{
        let text = textAreaInputdata;
        let expressionForChange = text.substring(start,end)
        let beforeExpressiontext = text.substring(0,start)
        let afterExpressiontext = text.substring(end)

        let result = ""
        if(type === "Bold"){
            result += beforeExpressiontext;
            result += ` [B]${expressionForChange}[/B] `;
            result += afterExpressiontext;
        }else if(type === "Italics"){
            result += beforeExpressiontext;
            result += ` [I]${expressionForChange}[/I] `;
            result += afterExpressiontext;
        }else if(type === "UnderLine"){
            result += beforeExpressiontext;
            result += ` [U]${expressionForChange}[/U] `;
            result += afterExpressiontext;
        }else if(type === "Crossed"){
            result += beforeExpressiontext;
            result += ` [S]${expressionForChange}[/S] `;
            result += afterExpressiontext;

        }
        return  result;
    }

}


export function removeExtraSpaces(str:string):string {
    let cleanedStr:string;
    if(str.length>2 && str[str.length-1] === " " && str[str.length-2] === " "){
        cleanedStr = str.trim().replace(/\s+/g, ' ');
    }else{
        cleanedStr = str;
    }
    return cleanedStr;

}