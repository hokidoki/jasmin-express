(
    function (){document.getElementById('login-button').addEventListener('click',()=>{
        const id = document.getElementById("login-id").value;
        const pw = document.getElementById("login-pw").value;

        if(!id){
            alert("id를 입력해주세요");
            return;
        }

        if(!pw){
            alert("pw를 입력해주세요");
            return;
        }

        axios.post('http://localhost:3000/service/login',{
            id,
            pw
        }).then((res)=>{
            alert(`${res.data}`)
        })
    })}
)();