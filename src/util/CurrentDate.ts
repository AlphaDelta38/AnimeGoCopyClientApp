
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