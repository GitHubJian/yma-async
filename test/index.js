const {Scheduler} = require('../src');

const myScheduler = new Scheduler(1);

myScheduler.addTask(function () {
    return new Promise(resolve => {
        setTimeout(function () {
            console.log('1');
            resolve();
        }, 1000);
    });
});

myScheduler.addTask(function () {
    return new Promise(resolve => {
        setTimeout(function () {
            console.log('2');
            resolve();
        }, 1000);
    });
});

myScheduler.addTask(function () {
    return new Promise(resolve => {
        setTimeout(function () {
            console.log('3');
            resolve();
        }, 1000);
    });
});

myScheduler.addTask(function () {
    return new Promise(resolve => {
        setTimeout(function () {
            console.log('4');
            resolve();
        }, 1000);
    });
});

myScheduler.run();
