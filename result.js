var formResult = document.getElementById('myFormResult')

formResult.addEventListener('submit', async function(e){
  e.preventDefault()

  var image_result = document.getElementById('image_result')
  var result_name = document.getElementById('result_name').value
  var result_text = document.getElementById('result_text').value

  if (!image_result.files[0]) {
    alert("Please choose an image");
    return;
  }

  var file = image_result.files[0];
  var reader = new FileReader();

  reader.onloadend = async function () {
    var base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

    await fetch("https://api.uzuniver.uz/api/v1/result",{
      method: 'POST',
      body:JSON.stringify({
        image: base64String, 
        fullname: result_name, 
        description: result_text
      }), 
      headers:{
        "Content-type":"application/json; charset=UTF-8"
      }
    })
    .then(function(responseResult){
      return responseResult.json()
    })
    .then(function(data){
      console.log(data)
    })
    .catch((error) => console.error('Error:', error));

    document.getElementById('myFormResult').reset()  
  }

  reader.readAsDataURL(file);
})
