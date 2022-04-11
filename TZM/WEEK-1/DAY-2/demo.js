let a = 0
if(true){
    console.log(a)
}

function mapDemo(){
    let myMap = new Map()
let keyA1 = 'a1'
myMap.set(keyA1, '和键入A1相关的值' )
return myMap.get('a1')

}

console.log(mapDemo()) 


let kvArray = [["key1", "value1"], ["key2", "value2"]];
