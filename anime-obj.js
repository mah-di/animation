class flash {                                                           // defining class for flashiing animation
    constructor(targetElement, xTimes, interval){
        this.count = 1;                                                 // this property keeps count of the times flashed
        this.targetElement = targetElement;                             // html element to be flashed
        this.xTimes = xTimes;                                           // number of time(s) to be flashed
        this.interval = (interval/200);                                 // full flash time
    }
    flashIt(){                                                          // this (flashing) method will execute flashing functionality
        let p = 100;                                                    // random variable to help set opacity
        let flashOut = setInterval(() => {                              // interval function for a flash out effect
            p--;                                                        // gradual decrement of opacity
            let j = p/100;                                              // opacity to be set
            this.targetElement.style.opacity = j;                       // opacity set
            if ( p == 0 ){
                clearInterval(flashOut);                                // stop flash out effect when opacity is 0
                let flashIn = setInterval(() => {                       // interval function for flash in effect
                    p++;                                                // gradual increment of opacity
                    j = p/100;                                          // opacity to be set
                    this.targetElement.style.opacity = j;               // opacity set
                    if ( p == 100 ){
                        clearInterval(flashIn);                         // stop flash in effect when opacity is 100
                        if ( this.xTimes == this.count ){               // checking if element flashed time(s) given
                            return;                                     // stop method execution if flashed defined time(s)
                        }
                        else{
                            this.count++;                               // else modify count(time(s) being flashed)
                            this.flashIt();                             // re-run flashing method
                        }
                   }
                }, this.interval);                                      // interval between flashIn function to be executed
            }
        }, this.interval);                                              // interval between flashOut function to be executed
    }
    trigger(){                                                          // this method will only execute flashIt method once the html element is on screen
        if ( this.targetElement.offsetTop <= (document.documentElement.clientHeight * 4)/5 ){
            this.flashIt();                                             // immediately execute flashIt method if the element is on page load view
        }
        else{
            let check = setInterval(() => {
                if ( this.targetElement.offsetTop <= window.pageYOffset + (document.documentElement.clientHeight * 4)/5 ){
                    this.flashIt();                                     // delay flashIt method if the element is elsewhere and execute when visible
                    clearInterval(check);
                }
            }, 100);                                                    // check element visibility every 100 milliseconds
        }
    }
}





class typeOut{                                                          // defining class for a write/wipe animation
    constructor(targetElement, docArray){
        this.targetElement = targetElement;                             // html element where the animation will be shown
        this.docArray = docArray;                                       // a document array with all the test(s) as it's element(s)
        this.count = 0;                                                 // we will use this variable to access every text inside the document array
        this.docCount = docArray.length;                                // number of element in the docArray
    }
    trigger(){                                                          // this (write/wipe) method will execute animation functionality
        let doc = this.docArray[this.count];                            // accessing (current array element) -> [CAE]
        let len = doc.length;                                           // string lenght of CAE
        let wipe = setInterval(() => {                                  // interval function for a wipe effect
            let text = doc.slice(0, (len - 1))                          // wiping CAE a letter at a time
            this.targetElement.innerHTML = text;                        // showing result on web page
            len--;                                                      // gradually decrementing CAE length
            if ( len == 0 ){
                clearInterval(wipe);                                    // stop wipe effect when CAE length is 0
                this.count++;
                if ( this.count == this.docCount ){                     // check if it's the last element of the docArray
                    this.count = 0;                                     // set the count to 0 to restart from the first array element
                }
                let write = setInterval(() => {                         // interval function for a write effect
                    doc = this.docArray[this.count];                    // accessing the (next array element) -> [NAE]
                    len++;                                              // gradually incrementing NAE length
                    text = doc.slice(0, (len));                         // writing NAE a letter at a time
                    this.targetElement.innerHTML = text;                // showing result on web page
                    if ( len == doc.length ){
                        clearTimeout(write);                            // stop write effect when NAE length is maxed
                        setTimeout(() => {
                            this.trigger();                             // re-run write/wipe method
                        }, 1000);                                       // slightly delay method to be re-run for text readability on web page
                    }
                }, 200);                                                // interval between writing 2 letters
            }
        }, 200);                                                        // interval between wiping 2 letters
    }
    delayedTrigger(){                                                   // this method will slightly delay write/wipe method on page load
        this.targetElement.innerHTML = this.docArray[this.count];       // showing first docArray element as default on page load
        setTimeout(() => {
            this.trigger();                                             // time for write/wipe method to be executed after the delay
        }, 1000);                                                       // milliseconds write/wipe method execution to be delayed
    }
}


// ================================== BELOW CODES ARE FOR DEMONSTRATION PURPOSE ONLY ==================================


let hh = document.getElementById('r');
let rr = 2;
let ii = 500;

let fl = new flash(hh, rr, ii);


fl.trigger();


let tt = document.getElementById('p');
const aa = ['HELP!', 'DELP!', 'FELP!', 'WELP!'];

let fr = new typeOut(tt, aa);


fr.delayedTrigger();