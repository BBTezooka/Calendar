const currentDate = document.querySelector(".current-date"),
    daysTag = document.querySelector(".days"),
    prevnextBUTT = document.querySelectorAll('.icons span')
    

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август',
        'Сентябрь','Октябрь','Ноябрь','Декабрь']

const RenderCalendar = () =>{
    let lastDateofMonth = new Date(currYear, currMonth + 1,0).getDate(), //Последнее число месяца
         firstDayofMonth = new Date(currYear, currMonth,1).getDay(), //Первый день месяца
         LastDayofMonth = new Date(currYear, currMonth,lastDateofMonth).getDay(), //Последний день месяца
         lastDateofLastMonth = new Date(currYear, currMonth,0).getDate(); //Последнее число прошлого месяца
    let liTag = '';

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class = 'inactive data'>${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++){
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                && currYear === new Date().getFullYear() ? 'active' : ''
        liTag += `<li class = '${isToday} data'>${i}</li>`;
    }

    for (let i = LastDayofMonth; i < 6; i++) {
        liTag += `<li class = 'inactive data'>${i - LastDayofMonth + 1}</li>`;
    }
    
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}

RenderCalendar();
PickTheDate();

prevnextBUTT.forEach(icon =>{
    icon.addEventListener('click',()=>{
        currMonth = icon.id === 'prev' ? currMonth - 1: currMonth +1;

        if(currMonth < 0 || currMonth > 11){
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        }else {
            date = new Date();
        }

        RenderCalendar();
        PickTheDate();
    })
});

function PickTheDate(){
    document.querySelectorAll('.data').forEach((e)=>{
    let intervalId;
    e.addEventListener('click', ()=>{
        if(e.classList.contains('picked')){
            intervalId = setTimeout(()=>{
                e.classList.remove('picked')
            },0)
        }else{
            e.classList.add('picked')
            clearInterval(intervalId);
        }
        
    })
})
}

