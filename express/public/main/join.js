function emailValidationCheck(email){
    const emailRegexp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    return emailRegexp.test(email);
}

const join = () => {

    const id = document.getElementById("login-id").value;
    const email = document.getElementById("login-email").value;
    const pw_1 = document.getElementById("login-pw-1").value;
    const pw_2 = document.getElementById("login-pw-2").value;

    function _join(id,email,password_1,password_2){
        if(id.length <5){
            alert("아이디는 5글자 이상 되어야 합니다.");
            return;
        }

        if(!emailValidationCheck(email)){
            alert("이메일을 확인해주세요.");
            return;
        }

        if(!password_1 || !password_2){
            alert("비밀번호를 입력해주세요.");
            return;
        }

        if(password_1 !== password_2){
            alert("비밀번호가 일치 하지 않습니다.");
            return
        }

        alert("good");
    }
    _join(id,email,pw_1,pw_2);
}

