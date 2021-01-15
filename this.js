"use strict";

// =======================================================
// アロー関数以外の関数における`this`
// ★ `this`の基本的な参照先はベースオブジェクトになる
// -> メソッドを呼ぶ際に、そのメソッドのドット演算子またはブラケット演算子のひとつ左にあるオブジェクト

// また、`this`がどの値を参照するかは関数の呼び出し時に決まるという性質に由来する

function fn1() {
    return this;
}

var fn2 = function() {
    return this;
}

console.log(fn1()); // => undefined
console.log(fn2()); // => undefined
// どちらもベースオブジェクトがないのでthisは`undefined`になる
// =======================================================

// =======================================================

var obj = {
    method1: function() {
        return this;
    },
    method2() {
        return this;
    }
};

console.log(obj.method1()); // => obj
console.log(obj.method2()); // => obj
// =======================================================

// =======================================================
// `this`を含むメソッドを変数に代入した場合
var person = {
    fullName: "hoge",
    sayName: function() {
        // `this`は呼び出し元によって異なる
        console.log(this)
        return this.fullName;
    }
};

console.log(person.sayName()); // => "hoge"

var say = person.sayName;

// say()にはベースオブジェクトがないため、thisはundefinedになる
say(); // => TypeError: Cannot read property 'fullName' of undefine
// =======================================================

// =======================================================
// コールバック関数の中で`this`を利用する
var Hoge = {
    hoge: "hoge",
    hogeArray(strings) {
        // コールバック関数は`callback()`のように呼び出される
        // そのためコールバック関数における`this`は`undefined`となる(strict mode)
        var callback = function(str) {
            return this.hoge + "-" + str;
        };
        return strings.map(callback);
    }
};
// `prefixArray`メソッドにおける`this`は`Prefixer`
Hoge.hogeArray(["a", "b", "c"]) // => TypeError: Cannot read property 'prefix' of undefined
// =======================================================

// =======================================================
// コールバック関数の中で`this`を利用する
// -> 対応としてアロー関数でコールバック関数を扱う

// アロー関数は暗黙的な`this`を受け取らない
// -> アロー関数は常に外側の`this`をそのまま利用する
var Hoge = {
    hoge: "hoge",
    hogeArray(strings) {
        return strings.map((str) => {
            return this.hoge + "-" +str;
        });
    }
}

console.log(Hoge.hogeArray(["a", "b", "c"])); // => ["pre-a", "pre-b", "pre-c"]
// =======================================================

// =======================================================
// ★ アロー関数と`this`
// アロー関数で定義されたthisがどの値を参照するかは関数の定義時(静的)に決まる
// 一方、Arrow Functionではない関数においては、thisは呼び出し元に依存するため関数の実行時（動的）に決まる

// > Arrow Functionとそれ以外の関数で大きく違うことは、Arrow Functionはthisを暗黙的な引数として受けつけないということです。 
// > そのため、Arrow Function内にはthisが定義されていません。このときのthisは外側のスコープ（関数）のthisを参照します。
// > これは、変数におけるスコープチェーンの仕組みと同様で、そのスコープにthisが定義されていない場合には外側のスコープを探索します。 
// > そのため、Arrow Function内のthisの参照で、常に外側のスコープ（関数）へとthisの定義を探索しに行きます（詳細はスコープチェーンを参照）。 また、thisはECMAScriptのキーワードであるため、ユーザーはthisという変数を定義できません。

// thisの値は、実行コンテキストが"Script"ならばグローバルオブジェクトとなり、"Module"ならばundefinedとなる
function outer() {
    return () => {
        return this;
    };
}

var innerArrowFunction = outer();
console.log(innerArrowFunction); // -> undefined
// =======================================================

// =======================================================

var Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
        return strings.map((str) => {
            // `Prefixer.prefixArray()` と呼び出されたとき
            // `this`は常に`Prefixer`を参照する
            return this.prefix + "-" + str;
        });
    }
};
var prefixedStrings = Prefixer.prefixArray(["a", "b", "c"]);
console.log(prefixedStrings); // => ["pre-a", "pre-b", "pre-c"]

// =======================================================

// =======================================================
var obj = {
    method() {
        const arrowFunction = () => {
            return this;
        };
        return arrowFunction();
    }
};

console.log(obj.method()); // => obj
// `methodを`That`としてcallすると、アロー関数の`this`も変更される
console.log(obj.method.call("That")); // => "That"
// =======================================================
