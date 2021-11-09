import './css/main.css';



class CountdownTimer {

    constructor({ selector, targetDate, timeLimitWarn = null }) {
        this.intervalId = null;
        this.selector = selector;
        this.targetDate = targetDate;
        this.timeLimitWarn = timeLimitWarn;

        this.refsClock = {
            days: document.querySelector(`${this.selector} span[data-value="days"]`),
            hours: document.querySelector(`${this.selector} span[data-value="hours"]`),
            mins: document.querySelector(`${this.selector} span[data-value="mins"]`),
            secs: document.querySelector(`${this.selector} span[data-value="secs"]`),
        };
        console.log('craete class constructor');

        this.init();
    }

    start() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                const timeDiff = this.timeDifference();
                if (timeDiff > 0) {
                    this.updateClockface(this.getComponentsClock(timeDiff));
                } else {
                    this.stop();
                }
            }, 1000);
        }

        
    }

    timeDifference() {
        return this.targetDate - Date.now();;
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    init() {
        if (this.timeDifference() <= 0) {
            
            this.updateClockface(this.getComponentsClock(0));
        } else {
            this.start();
        }
    };

    getComponentsClock(time) {
        /*
        * Дні, що залишилися: ділимо значення UTC на 1000 * 60 * 60 * 24, кількість
        * мілісекунд в один день (мілісекунди * секунди * хвилини * години)
        */
        const days = Math.floor(time / (1000 * 60 * 60 * 24));

        /*
        * Решта годин: отримуємо залишок від попереднього розрахунку за допомогою оператора
        * залишку% і ділимо його на кількість мілісекунд в одній годині
        * (1000 * 60 * 60 = мілісекунди * хвилини * секунди)
        */
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        /*
        * Решта хвилин: отримуємо хвилини, що залишилися і ділимо їх на кількість
        * мілісекунд в одній хвилині (1000 * 60 = мілісекунди * секунди)
        */
        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

        /*
        * Решта секунд: отримуємо секунди, які залишилися і ділимо їх на кількість
        * миллисекунд в одной секунде (1000)
        */
        const secs = Math.floor((time % (1000 * 60)) / 1000);

        return {days, hours, mins, secs};
    };

    updateClockface({ days, hours, mins, secs }) {
        let activeLimitWarn = false;
        if (this.timeLimitWarn) {
            activeLimitWarn = true;
            if (days > this.timeLimitWarn.d)
                activeLimitWarn = false;
            else if (days === this.timeLimitWarn.d && hours > this.timeLimitWarn.h)
                activeLimitWarn = false;
            else if (hours === this.timeLimitWarn.h && mins > this.timeLimitWarn.m)
            activeLimitWarn = false;
            else if(mins === this.timeLimitWarn.m && secs > this.timeLimitWarn.s)
                activeLimitWarn = false;
            // && hours <= this.timeLimitWarn.h && mins <= this.timeLimitWarn.m && secs <= this.timeLimitWarn.s) {
            // document.querySelector(`${this.selector}`).style.color = 'red';
        }

        if (activeLimitWarn) document.querySelector(`${this.selector}`).style.color = 'red';
        this.refsClock.days.textContent = this.pad(days);
        this.refsClock.hours.textContent = this.pad(hours);
        this.refsClock.mins.textContent = this.pad(mins);
        this.refsClock.secs.textContent = this.pad(secs);
    }
    
    pad(value) {
        return String(value).padStart(Math.max(2, String(value).length), '0');
    }

};



const countdownTimer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Nov 17, 2021'),
    timeLimitWarn: {
        d: 2,
        h: 0,
        m: 0,
        s: 0,
    },
});