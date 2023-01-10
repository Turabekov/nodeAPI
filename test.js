
function  sostavChisla(arrayNumbers, sumNum) {
    let storage = []

    for (let i = 0; i < arrayNumbers.length; i++) {
        const element = arrayNumbers[i];
        let newArr = []
        if (element === sumNum) {
            newArr.push(element)
            storage.push(newArr)
            continue
        }

        // Array without current elemnt in i loop
        let arrayWithoitElem = arrayNumbers.filter(item => item !== element)

        for (let j = 0; j < arrayWithoitElem.length; j++) {
            if (element + arrayWithoitElem[j] === sumNum) {
                newArr.push(element)
                newArr.push(arrayWithoitElem[j])
                
                storage.push(newArr)
            }    
            
        }

    }

    storage = storage.map(item => {
        console.log(item)
    })

    return storage
}




console.log(sostavChisla([1, 2, 3, 4, 5, 6, 7, 8], 8))