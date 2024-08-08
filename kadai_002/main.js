//変数の初期化
let untyped = '';
let typed = '';
let score = 0;
let currentScore = 0;

//必要なhtml要素の取得
//実際に画面に表示するuntypedの値
const untypedfield = document.getElementById('untyped');
//実際に画面に表示するtypedの値
const typedfield = document.getElementById('typed');
//画面に出力される文字数を囲むグループ
const wrap = document.getElementById('wrap');
//スタート関数
const start = document.getElementById('start');
//タイマーのための時間表示の取得
const count = document.getElementById('count');
//現在の文字数の表示　定数の代入
const currentId = document.getElementById('current-count');


//複数のテキストを格納する配列
const textLists = [
    'Hello world',
    'This is My App',
    'How are you?',
    'Hello World', 'This is my App', 'How are you?',
    'Today is sunny', 'I love JavaScript!', 'Good morning',
    'I am Japanese', 'Let it be', 'Samurai',
    'Typing Game', 'Information Technology',
    'I want to be a programmer', 'What day is today?',
    'I want to build a web app', 'Nice to meet you',
    'Chrome Firefox Edge Safari', 'machine learning',
    'Brendan Eich', 'John Resig', 'React Vue Angular',
    'Netscape Communications', 'undefined null NaN',
    'Thank you very much', 'Google Apple Facebook Amazon',
    'ECMAScript', 'console.log', 'for while if switch',
    'var let const', 'Windows Mac Linux iOS Android',
    'programming'
];


//カウントダウンタイマー
const timer = () => {

    //タイマーのhtml部分の要素の取得
    let time = count.textContent;

    //タイマーの時間を減らしていく関数　setIntervalを用いた繰り返し処理
    const id = setInterval(() => {
        //タイマーから1引いて再代入
        time--;
        count.textContent = time;

        if (time <= 0) {
            //セットタイムアップ関数を用いたタイムアップの表示
                typedfield.textContent = '';
                untypedfield.textContent = 'タイムアップ！';
                setTimeout(()=>{
                    gameOver(id);
                },10);
        }
    }, 1000)
};



//ランダムなテキストを配列の中から抽出して画面に出力
const createText = () => {

    //typeされた文字列の初期化
    typed = '';
    //初期化された文字列の画面への出力
    typedfield.textContent = typed;
    //untypedにtextListのランダムで選ばれた要素を代入
    untyped = textLists[Math.floor(Math.random() * textLists.length)];
    //ランダムで選ばれた要素を画面に出力する
    untypedfield.textContent = untyped;

};



//キー入力の判定 イベント　キーが押されたとき
const keyPress = e => {

    //誤タイプの場合の処理
    //入力されたキーが一文字目と異なる場合は何も起こらず処理が終了(return)
    if (e.key !== untyped.substring(0, 1)) {
        //ミスした場合はwrapにmistypedを追加
        wrap.classList.add('mistyped');
        //0.1秒あとに背景色をもとに戻す
        //setTimeoutは一定時間後に一度だけ処理を行う関数
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);
        return;
    }


    //正しかった場合はスコア変数をインクリメント
    score++;
    //正しかった場合は現在のスコアの変数をインクリメント
    currentScore++;
    //正しかった場合はmistypedを取り消す
    wrap.classList.remove('mistyped');
    //untypedの一文字目をtypedに代入
    typed += untyped.substring(0, 1);
    //untypedに残りの一文字目以降の文字を再代入
    untyped = untyped.substring(1);
    //タイプされた文字を出力
    typedfield.textContent = typed;
    //まだ入力されていない文字を継続表示
    untypedfield.textContent = untyped;
    //現在のスコアを画面に出力
    currentId.textContent = currentScore;

    //テキストがなくなったらcreateText関数で新しいテキストを表示
    if (untyped === '') {
        createText();
    }

};


//ゲームスタート時の処理 スタートボタンがクリックされると
start.addEventListener('click', () => {

    //タイマーの開始
    timer();
    //クリエイトテキスト関数の実行
    createText();
    //startボタンの表示をオフにする
    start.style.display = 'none';
    //スタートボタンを押したのちにキー入力の処理
    document.addEventListener('keypress', keyPress);

});
untypedfield.textContent = 'スタートボタンで開始';



//タイピングスキルのランクを判定
const rankCheck = score => {
    let text = '';

    //スコアに応じて異なるメッセージを変数textに格納
    if (score < 100) {
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if (score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    } else if (score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
    } else if (score >= 300) {
        text = `あなたのランクはSです。おめでとうございます`;
    }

    return `${score}文字打てました！\n${text}\n【OK】リトライ/【キャンセル】終了`
};



//ゲームを終了
const gameOver = id => {
    //インターバルの終了　引数であるid関数を終了する
    clearInterval(id);
    //ダイアログボックスの表示
    const result = confirm(rankCheck(score));
    //ダイアログボックスにokを入力するとtureが戻り値として帰ってくるから
    //okボタンを押すとウィンドウをリロードする
    if (result == true) {
        window.location.reload();
    }
};


//現在のスコアのHTML要素を取得
//現在のスコアの変数を作成
//正しい文字が入力されるたびに変数をインクリメント
//インクリメントされるたびに変数をHTML要素のテキストコンテンツに代入して画面に出力


//setTimeout関数を利用したタイムアップの表示
//0になったらタイムアップを表示しダイアログボックスをセットタイムアップ関数で表示する