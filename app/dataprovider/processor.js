
import Tree from './node.js'

export default class DataProcessor {
    constructor(){}

    jsonifyText(text){
        return 'One love';
    }

    process(files, resultHandlers){

        files.forEach((file)=>{
            let tree = new Tree(file.name, 4)
            let reader = new FileReader();

            reader.onloadend = () => {
                let contentArray = reader.result.substring(reader.result.indexOf('1)')).split('\n')

                for (let index = 0; index < contentArray.length; index++) {
                    contentArray[index] = contentArray[index].trim();
                    let num = contentArray[index].slice(0, contentArray[index].indexOf(')'));
                    let text = contentArray[index].slice(contentArray[index].indexOf(')')+1);

                    let foundNode = tree.getNodeByNumber(parseInt(num));
                    if(foundNode){
                        foundNode.text = text;                        
                        this.processTextProperties(foundNode, text, file.name)
                    }                     
                }

                resultHandlers.forEach((handler)=>{
                    handler(tree);
                })
                
            }

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');

            reader.readAsBinaryString(file);
        });
    }

    processTextProperties(anode, textProps, fileName){
        if(!anode.isRoot){
            anode.circumstance = textProps.substring(0, textProps.indexOf('=')).trim();
        }
    }
}