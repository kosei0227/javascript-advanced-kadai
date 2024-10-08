$(function () {
    //マウスオーバー時・アウト時のアニメーション
    $('.button-more').on('mouseover', function () {
        $(this).animate({
            opacity: 0.5,
            marginLeft: 20,
        }, 100);
    });

    $('.button-more').on('mouseout', function () {
        $(this).animate({
            opacity: 1,
            marginLeft: 0,
        }, 100);
    });

    $('#submit').on('mouseover', function () {
        $(this).animate({
            opacity: 0.5,
            marginLeft: 20,
        }, 100);
    });

    $('#submit').on('mouseout', function () {
        $(this).animate({
            opacity: 1,
            marginLeft: 0,
        }, 100);
    });

    //カルーセル
    $('.carousel').slick({
        autoplay: true,
        dots: true,
        infinite: true,
        autoplaySpeed: 3000,
        arrows: false,
    });

    //入力チェックの関数

    $('#submit').on('click', function (event) {
        //フォームタグによる送信を否定
        event.preventDefault();
        //入力チェックした内容をresultに格納
        let result = inputCheck();

        //エラー判定とメッセージの取得
        let error = result.error;
        let message = result.message;

        if (error == false) {
            //送信成功メッセージの出力
            alert('お問合わせを送信しました')
        } else {
            //エラーメッセージの表示
            alert(message);
        }

        console.log('test');
    });







    //bulrは要素からフォーカスが離れた瞬間に発生するメゾット

    $('#name').blur(function () {
        inputCheck();
    });
    $('#furigana').blur(function () {
        inputCheck();
    });

    $('#email').blur(function () {
        inputCheck();
    });

    $('#tel').blur(function () {
        inputCheck();
    });

    $('#message').blur(function () {
        inputCheck();
    });

    $('#agree').blur(function () {
        inputCheck();
    });

    $('#prefecture').blur(function () {
        inputCheck();
    });









    //インプットチェックの関数--------------------------------------------------------------
    function inputCheck() {
        //エラーチェックのための変数
        let result;
        //エラーメッセージ格納のための変数
        let message = '';
        //エラーのtrue,faulsの判定のための変数
        let error = false;



        //判定-----------------------------------------------------------------------------
        if ($('#name').val() == '') {
            //エラーあり
            $('#name').css('background-color', '#f79999');
            error = true;
            //メッセージの格納
            message += 'お名前を入力してください\n';
        } else {
            //エラーなし
            $('#name').css('background-color', '#fafafa');
        }
        //フリガナの判定
        if ($('#furigana').val() == '') {
            $('#furigana').css('background-color', '#f79999');
            message += 'フリガナを入力してください\n';
            error = true;
        } else {
            $('#furigana').css('background-color', '#fafafa');
        }

        //メールアドレスや電話番号などの文字列の判定（簡易版）
        //indexOf('文字列')は指定した文字が何文字目にあるか数値で返すメゾット -1は含まれていないことになる
        if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
            error = true;
            message += 'メールアドレスが未記入、または「@」や「.」が含まれていません\n';
            $('#email').css('background-color', '#f79999');
        } else {
            $('#email').css('background-color', '#fafafa');
        }

        //電話番号は必須項目ではないため、エラーの条件は-が含まれていない
        //入力していて(false)　　　　　　　ハイフンが含まれないとき　エラーになる。
        //入力していないとtrueなので　ハイフンが無くてfalseだったとしても　&&　はtrueになる→未入力はとおる
        if ($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) {
            message += '電話番号に「-」が含まれていません';
            $('#tel').css('background-color', '#f79999');
        } else {
            $('#tel').css('background-color', '#fafafa');
        }

        //お問い合わせ内容の判定
        if ($('#message').val() == '') {
            $('#message').css('background-color', '#f79999');
            message += 'お問い合わせ内容を入力してください\n';
            error = true;
        } else {
            $('#message').css('background-color', '#fafafa');
        }

        //都道府県選択のif文
        if ($('#prefecture').val() == '') {
            error = true;
            message += 'お住まいの都道府県を選択してください\n';
            $('#prefecture').css('background-color', '#f79999');
        } else {
            $('#prefecture').css('background-color', '#fafafa');
        }

        //-------------------------------------------------------------------------

        if ($('#agree').prop('checked') == false) {
            error = true;
            message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください';
        }


        //エラーの有無で送信ボタンの切り替えを行う
        if (error == true) {
            $('#submit').attr('src', 'images/button-submit.png');
        } else {
            $('#submit').attr('src', 'images/button-submit-blue.png');
        }

        //エラー判定とメッセージ
        result = {
            error: error,
            message: message
        }

        return result;

    };
    //------------------------------------------------------------------------------------


});