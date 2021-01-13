// =======================================================
// async
// - 必ずPromiseインスタンを返す関数を定義する構文

async function doAsync() {
    return "値"
}

doAsync().then(value => {
    console.log(value); // => "値"
});


// これと同じことをしている
function doAsync() {
     return Promise.resolve("値");
}

// =======================================================
// await
// - 非同期処理が終わるのを待つ
async function doAsync() {
    // 非同期処理    
}

async function asyncMain() {
    // doAsyncの非同期処理が完了するまでまつ
    await doAsync();

    console.log("この行は非同期処理が完了後に実行される");
}
// =======================================================

// =======================================================
// これと同じ
// await式を使うことでコールバック関数を使わずに非同期処理の流れを表現できる

function asyncMain() {
    return Promise.resolve(42).then(value => {
        console.log(value); // => 42
    });
}
asyncMain(); // Promiseインスタンスを返す

// =======================================================

// =======================================================
// try...catch
// awaitはtry...catchでエラーを捕獲できる
async function asyncMain() {
    try {
        const value = await Promise.reject(new Error("エラーメッセージ"));

    } catch (error) {
        console.log(error.message)        
    }
}

asyncMain().catch(error => {
    // すでにtry...catchされているため、この行は実行されない
});
// =======================================================

// =======================================================
// await式はasync関数の中でのみ利用可能
function main() {
    // エラー
    // await Promise.resolve();
}
async function fetchResources(resource) {
    var results = [];

     // async function(resource){ ..とすればawait式を利用できる
    resourceLimits.forEach(function(resource){
        var resource = resources[i];
        // ★ Async Functionではないスコープで`await`式wを利用しているためSyntax Errorとなる
        // var resource = await dummyFetch(resource);
        results.push(response.body);
    });
    return results;
}


// =======================================================

// =======================================================
// await式を使って処理をもあっている間も、関数の外側では通常通り処理が進む

async function asyncMain() {
    await new Promise((resolve)  => {
        setTimeout(resolve, 16);
    });
}

console.log(1)

asyncMain().then(() => {
    console.log(3)
});

console.log(2)
// =======================================================

