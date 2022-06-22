let postForm = document.getElementById("post-form");
let postHolder = document.getElementById("post-holder");
let postBody= document.getElementById("body");
let postTitle= document.getElementById("title");
let postArray= [];

function getApiPost(){
    
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        postArray=json;
        console.log(postArray)
        showPostUI(postArray)
    })
   
}
getApiPost();

function showPostUI(){
    let postString = '';
            for (i=0; i<postArray.length; i++){
                postString += `
                    <div class="col-lg-4 col-md-6">  
                        <div class="card mb-5">
                            <img src="images/chess.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                               <h4>${postArray[i].id}</h4>
                               <h5 class="post-title">${postArray[i].title}</h5>
                                <p class="post-body">${postArray[i].body}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-primary" onclick="updateSinglePost(${postArray[i].id})">Update</button>
                                    <button class="btn btn-dark" onclick="viewSinglePost(${postArray[i].id})">view more</button>
                                    <button class="btn btn-danger" onclick="deleteSinglePost(${postArray[i].id})">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            
            postHolder.innerHTML = postString;

}


postForm.addEventListener ('submit', createOnePost)

function createOnePost(e) {
    e.preventDefault();
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: postTitle.value,
            body: postBody.value,
            // userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((json) => {
            postArray.unshift(json);
            let postString = '';
            for (i=0; i<postArray.length; i++){
                postString += `
                    <div class="col-lg-4 col-md-6">  
                        <div class="card mb-5">
                            <img src="images/chess.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                               <h4>${postArray[i].id}</h4>
                               <h5 class="post-title">${postArray[i].title}</h5>
                                <p class="post-body">${postArray[i].body}</p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-primary" onclick="updateSinglePost(${postArray[i].id})">Update</button>
                                    <button class="btn btn-dark" onclick="viewSinglePost(${postArray[i].id})">view more</button>
                                    <button class="btn btn-danger" onclick="deleteSinglePost(${postArray[i].id})">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            
            postHolder.innerHTML = postString;

        })
}

function updateSinglePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: postTitle.value,
            body: postBody.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            
            let postTitles = document.querySelectorAll('.post-title') 
            let postBodies = document.querySelectorAll('.post-body')
            
            postTitles.forEach((postTitled, index) => {
                if (index + 1 === id) {
                    if (json.title !== "") {
                        postTitled.innerHTML = json.title
                    }
                }

            })

            postBodies.forEach((postBodys, index) => {
                if (index + 1 === id) {
                    if (json.body !== "") {
                        postBodys.innerHTML = json.body
                    }
                }

            })

        });
}


function openSingle(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'single.html'
            
        });
}

function deleteSinglePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            postArray = postArray.filter(post => post.id !== id)
            console.log(postArray)
            
            showPostUI(postArray)  
        })

}
