// =======================================================
// 指定した`timeout`ミリ秒経過するまで同期的にブロックする関数
function blockTime(timeout) {
    const startTime = Date.now();
    while (true) {
        const diffTime = Date.now() - startTime;
        if (diffTime >= timeout) {
            return;
        }
    }
}

console.log("1. setTimeoutのコールバック関数を10ミリ秒後に実行します");
setTimeout(
    () => {
        console.log("3. ブロックする処理を開始します")
        blockTime(1000);
        console.log("4. ブロックする処理が完了しました");
    }, 10);
console.log("2. 同期的な処理を実行します");

// =======================================================

// =======================================================

try {
    setTimeout(
        () => {
            // throw new Error("非同期なエラー");
        }, 10);
} catch (error) {
    console.log("非同期エラーはキャッチできないため、この行は実行されない")
}
console.log("この行は実行される")

// setTimeoutで登録されたコールバックが実際に例外を投げるのは、すべての同期処理が終わった後

// =======================================================

// =======================================================
// エラーファーストコールバック
// 処理が失敗した場合 -> コールバックの1番目の引数にエラーオブジェクトを渡す
// 処理が成功した場合 -> コールバックの2番目の引数に成功時の結果を渡して呼び出す

let fs = require('fs');
fs.readFile("./example.txt", (error, data) => {
    if (error) {
        // 読み込みに失敗しました
    } else {
        // データを読み込むことができました
    }
});

// =======================================================

// =======================================================
function dummyFetch(path, callback) {
    setTimeout(() => {
        if (path.startsWith("/success")) {
            callback(null, {body: `Response body of ${path}`});
        } else {
            callback(new Error("NOT FOUND"));
        }
    }, 1000 * Math.random())
}

dummyFetch("/success/data", (error, response) => {
    if (error) {
        // この行は実行されません
    } else {
        console.log(response)
    }
});

// =======================================================

// =======================================================
// `Promise`インスタンスを作成
var promise = new Promise((resolve, reject) => {
    // 非同期の処理が成功したときはresolve()を呼ぶ
    // 非同期の処理が失敗したときにはreject()を呼ぶ
});
var onFulfilled = () => {
    console.log("resolveされたときに呼ばれる");
};
var onRejected = () => {
    console.log("rejectされたときに呼ばれる");
};
// `then`メソッドで成功時と失敗時に呼ばれるコールバック関数を登録
promise.then(onFulfilled, onRejected);

// =======================================================

// =======================================================
// promise
// 非同期処理はコールバック関数を受け取るのではなく、Promiseインスタンを返す
function dummyFetch(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                if (path.startsWith("/success")) {
                    resolve({ body: `Response body of ${path}`});
                } else {
                    reject(new Error("NOT FOUND"))
                }
        }, 1000 * Math.random());
    });
}

dummyFetch("/success/data").then(
    function onFulfilled(response) {
        console.log(response);
    },
    function onRejected(error){
        // この行は実行されない
    }
);
// =======================================================

// =======================================================
// primiseの状態
//  - fullfilled
//  - rejected -> 成功時メソッドが呼ばれる
//  - pending -> 失敗時メソッドが呼ばれる
//  - setteld
// -> これらの状態は一度しか変化しない
// -> 一度だけ呼ばれるコールバック関数を登録するのが`then`や`catch`メソッドとなる


// =======================================================
// fullfilledなPromiseインスタンスを生成
// Promise.resolveメソッドはnew Promiseの糖衣構文
var promise = Promise.resolve();

// 成功時のコールバック関数を登録
promise.then(() => {
    console.log("2. コールバック関数が実行されました")
});
console.log("1. 同期的な処理が実行されました")

// =======================================================