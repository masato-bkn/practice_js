// =======================================================
// 関数宣言の種類

// functionキーワード
function fn1() {}

// 変数に格納
var fn2 = function() {};

// アロー関数
var fn3 = () => {};

// プロパティに関数を定義
// ★ jsではオブジェクトのプロパティが関数である場合にそれをメソッドと呼ぶ
var obj = {
    method1: function() {

    },
    method2: () => {

    }
}

// メソッドの短縮記法
var obj = { 
    method() {
    }
};
// =======================================================
