async function getContact(){
  let url = 'https://api.uzuniver.uz/api/v1/contact';
  let response = await fetch(url)
  let nimadir = await response.json()
  let tayyor = nimadir.content;
  
  document.getElementById('contact_table').innerHTML = ''
  for(let i=0; i<=tayyor.length; i++){
    document.getElementById('contact_table').innerHTML += `
    <tr>
    <td scope="col">${i+1}</td>
    <td scope="col">${tayyor[i].name}</td>
    <td scope="col">${tayyor[i].email}</td>
    <td scope="col">${tayyor[i].phone}</td>
    <td scope="col">${tayyor[i].message}</td>
    <td scope="col"><button onclick="deleteContact(${tayyor[i].id})" class="btn btn-danger m-2">Delete</button>
    </td>
    </tr>
    `
  }
}

getContact()


async function getCourse(){
  let url = 'https://api.uzuniver.uz/api/v1/course';
  let response = await fetch(url)
  let nimadir = await response.json()
  let tayyor = nimadir.content
  
  document.getElementById('course_table').innerHTML = ''
  for(let i=0; i<=tayyor.length; i++){
    document.getElementById('course_table').innerHTML += `
    <div class="facilities-col">
    <img src="data:image/png;base64,${tayyor[i].image}" alt="" width="320" height="360">
    <h3>${tayyor[i].name}</h3>
    <p>${tayyor[i].description}</p>
    </div>
    `
  }
}

getCourse()




async function getCourseAdmin(){
  let url = 'https://api.uzuniver.uz/api/v1/course';
  let response = await fetch(url)
  let nimadir = await response.json()
  let tayyor = nimadir.content
  
  document.getElementById('course_table_admin').innerHTML = ''
  for(let j=0; j<=tayyor.length; j++){
    document.getElementById('course_table_admin').innerHTML += `
    <div class="facilities-col">
    <img img src="data:image/png;base64,${tayyor[j].image}" alt="" width="200" height="200">
    <h3>${tayyor[j].name}</h3>
    <p>${tayyor[j].description}</p>
    <button onclick="deleteCourse(${tayyor[j].id})" class="btn btn-danger m-2">Delete</button>
    </div>
    
    `
  }
}

getCourseAdmin()




async function getResult(){
  let url = 'https://api.uzuniver.uz/api/v1/result';
  let response = await fetch(url)
  let nimadir = await response.json()
  let tayyor = nimadir.content
  
  document.getElementById('result_table').innerHTML = ''
  for(let i=0; i<=tayyor.length; i++){
    document.getElementById('result_table').innerHTML += `
    <div class="facilities-col">
    <img img src="data:image/png;base64,${tayyor[i].image}" alt="" width="300" height="300">
    <h3 class="result_name">${tayyor[i].fullname}</h3>
    <p class="result_text">${tayyor[i].description}</p>
    </div>
    `
  }
}

getResult()

async function getResultAdmin(){
  let url = 'https://api.uzuniver.uz/api/v1/result';
  let response = await fetch(url)
  let nimadir = await response.json()
  let tayyor = nimadir.content
  
  document.getElementById('result_table_admin').innerHTML = ''
  for(let i=0; i<=tayyor.length; i++){
    document.getElementById('result_table_admin').innerHTML += `
    <div class="facilities-col" id=>
    <img img src="data:image/png;base64,${tayyor[i].image}" alt="" width="200" height="200">
    <h3 class="title_result">${tayyor[i].fullname}</h3>
    <p class="text_result">${tayyor[i].description}</p>
    <button onclick="deleteResult(${tayyor[i].id})" class="btn btn-danger m-2" id="delete-post-result">Delete</button>
    </div>
    `
  }
}

getResultAdmin()


let form = document.getElementById('myForm')

form.addEventListener('submit',async function(e){

  e.preventDefault()
  

  var name = document.getElementById('name').value
  var email = document.getElementById('email').value
  var number = document.getElementById('number').value
  var message = document.getElementById('message').value

  await fetch("https://api.uzuniver.uz/api/v1/contact/",{
    method: 'POST',
    body:JSON.stringify({
      name:name, 
      email: email, 
      phone:number, 
      message: message
    }), 
    headers:{
      "Content-type":"application/json; charset=UTF-8"
    }
  })

  .then(function(response){ 
    return  response.json()
    console.log(response)
  })
  .then(function(data){
    console.log(data)
  })


  document.getElementById('myForm').reset()
  alert('Biz siz bilan albatta aloqaga chiqamiz')
})



async function deleteResult(id){
  const res  = await fetch(`https://api.uzuniver.uz/api/v1/result/${id}`,
  {
    method: 'DELETE',
    headers:{
      'Content-type':'application/json',
    }
  }
  )
  .then(()=>location.reload())
  const data = await res.json();
  console.log(data);

  if(data){
    document.getElementById(`${tayyor[i].id}`).remove()
  }
}

async function deleteCourse(id){
  const res  = await fetch(`https://api.uzuniver.uz/api/v1/course/${id}`,
  {
    method: 'DELETE',
    headers:{
      'Content-type':'application/json',
    }
  }
  )
  .then(()=>location.reload())
  const data = await res.json();
  console.log(data);

  if(data){
    document.getElementById(`${tayyor[j].id}`).remove()
    
  }

}

async function deleteContact(id){
  const res  = await fetch(`https://api.uzuniver.uz/api/v1/contact/${id}`,
  {
    method: 'DELETE',
    headers:{
      'Content-type':'application/json',
    }
  }
  )
  .then(()=>location.reload())
  const data = await res.json();
  console.log(data);

  if(data){
    document.getElementById(`${tayyor[j].id}`).remove()
  }
}






function toBase64(file) {
  return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = error => reject(error);
  });
}

var file = document.querySelector('#image_course').files[0]; // Rasmni tanlash
toBase64(file).then(data => console.log(data)); // base64 formatdagi ma'lumotlarni konsolga chiqarish
