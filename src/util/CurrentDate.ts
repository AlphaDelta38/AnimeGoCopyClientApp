
enum Months {
    января = 1,
    февраля,
    марта,
    апреля,
    мая,
    июня,
    июля,
    августа,
    сентября,
    октября,
    ноября,
    декабря
}


export function currentDate(): string{
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();

    return  `${day} ${Months[month+1]} ${year}`
}



export function calculateAge(dateOfBrithDay:string): string {
    let year: number = Number(dateOfBrithDay.split(" ")[2])
    let month: any = Months[dateOfBrithDay.split(" ")[1] as keyof typeof  Months]
    let day: number = Number(dateOfBrithDay.split(" ")[0])

    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();


    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    let lastNumberOfAge = Number(age.toString()[age.toString().length - 1])

    if(lastNumberOfAge === 1){
        return `${age} год`
    }else if(age >= 5 && age <= 20){
        return `${age} лет`
    }else if(lastNumberOfAge >= 5 || lastNumberOfAge === 0){
        return `${age} лет`
    }else if(lastNumberOfAge > 1 && lastNumberOfAge < 5){
        return `${age} года`
    }

    console.log(lastNumberOfAge, age)
    return "error"


}