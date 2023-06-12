var formCourse = document.getElementById('myFormCourse')

formCourse.addEventListener('submit', async function(j){
  j.preventDefault()

  var image_course = document.getElementById('image_course')
  var science = document.getElementById('science').value
  var science_text = document.getElementById('science_text').value

  if (!image_course.files[0]) {
    alert("Please choose an image");
    return;
  }

  var file = image_course.files[0];
  var reader = new FileReader();

  reader.onloadend = async function () {
    var base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    await fetch("https://api.uzuniver.uz/api/v1/course/",{
      method: 'POST',
      body:JSON.stringify({
        image: base64String, 
        name: science, 
        description: science_text
      }), 
      headers:{
        "Content-type":"application/json; charset=UTF-8"
      }
    })
    .then(function(responseCourse){
      return responseCourse.json()
    })
    .then(function(data){
      console.log(data)
    })
    .catch((error) => console.error('Error:', error));

    document.getElementById('myFormCourse').reset()  
  }

  reader.readAsDataURL(file);
})
