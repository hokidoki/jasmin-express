

const displayArticle = (isLatest,articles) => {
    const articleContainer = document.getElementById('article-container')
    
    function makeArticleBox({No,date,writer,article}){
        const articleBox = document.createElement('div');
        articleBox.className = "articleBox";

        const articleFlexContainer = document.createElement('div');
        articleFlexContainer.className = "article-flex-container";

        const headContainer = document.createElement('div');
        headContainer.className = "head-flex-container";

        const noDiv = document.createElement('div');
        noDiv.className = "no";
        noDiv.innerText = No;

        const dateDiv = document.createElement('div');
        dateDiv.className = 'date';
        dateDiv.innerText = date;
        
        const writerDiv = document.createElement('div');
        writerDiv.className = "writer";
        writerDiv.innerText = writer;

        const articleDiv = document.createElement('div');
        articleDiv.className = "article";
        articleDiv.innerText = article;

        headContainer.appendChild(noDiv);
        headContainer.appendChild(dateDiv);
        headContainer.appendChild(writerDiv);

        articleFlexContainer.appendChild(headContainer);
        articleFlexContainer.appendChild(articleDiv);

        articleBox.appendChild(articleFlexContainer);
        
        return articleBox;
    }
    
    const div = document.createElement('div');

    articles.map((article)=>{
        div.appendChild(makeArticleBox(article))
    })

    if(isLatest){
        if(articleContainer.childNodes[0]){
            articleContainer.insertBefore(div,articleContainer.childNodes[0]);
        }else{
            articleContainer.appendChild(div);
        }
    }else{
        articleContainer.insertBefore(div,articleContainer.childNodes[articleContainer.childNodes.length -1]);
    }
    
    
}

(
    function(button,editor){
        button.addEventListener('click',()=>{
            if(editor.value.length < 10){
                alert("글은 최소 10자리 이상되어야 합니다.");
                return;
            }

            axios.post('http://localhost:3000/article',{
                article : editor.value
            }).then((res)=> displayArticle(true,res.data))
        })
    }
)(document.getElementById("write-button"),document.getElementById("editor"))
var init =null 
var last = false
function getArticle(oldestNo){
    if((!init || oldestNo === init)){
        const button = document.getElementById('get-article-button');
        axios.get(`http://localhost:3000/article?from=${oldestNo}&limit=${oldestNo > 10 ? 10 : oldestNo}`).then((res)=>{
            if(res.data.length < 10){
                last = true;
            }else{
                
                displayArticle(false,res.data)
                init = res.data[res.data.length - 1].No;
                button.addEventListener('click',()=>getArticle(res.data[res.data.length - 1].No))
                if(last){
                    button.removeEventListener('click',getArticle)
                }
            }
        })
    }
    
}