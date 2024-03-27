function Node(value) {
    this.value = value;
    this.next = null;
}

function Queue() {
    this.size = 0;
}

Queue.prototype.enqueue = function enqueue(value) {
    const node = new Node(value);

    if (this.head) {
        this.tail.next = node;
        this.tail = this.tail.next;
    } else {
        this.head = node;
        this.tail = node;
    }

    this.size++;
};

Queue.prototype.dequeue = function dequeue() {
    const current = this.head;
    if (!current) {
        return;
    }

    this.head = this.head.next;
    this.size--;

    return current.value;
};

Queue.prototype.clear = function clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
};

function aLimit(concurrency = 3) {
    let activeCount = 0;
    let queue = new Queue();

    function next() {
        activeCount--;
        if (queue.size > 0) {
            queue.dequeue()();
        }
    }

    function run(fn, resolve, args) {
        activeCount++;

        fn(args).then(function (res) {
            resolve(res);
            next();
        });
    }

    function add(fn, resolve, args) {
        queue.enqueue(run.bind(null, fn, resolve, args));

        (function () {
            setTimeout(function () {
                if (activeCount < concurrency && queue.size > 0) {
                    queue.dequeue()();
                }
            });
        })();
    }

    function wrap(fn, ...args) {
        return new Promise(function (resolve) {
            add(fn, resolve, args);
        });
    }

    return wrap;
}

function Scheduler(concurrency) {
    this.tasks = [];
    this.alimit = aLimit(concurrency);
}

Scheduler.prototype.addTask = function addTask(fn, ...args) {
    this.tasks.push(this.alimit(fn, ...args));
};

Scheduler.prototype.run = function run() {
    return Promise.all(this.tasks).then(() => {
        this.tasks = [];
    });
};

aLimit.Scheduler = Scheduler;
module.exports = aLimit;
