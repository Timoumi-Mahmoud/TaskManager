const btn = document.getElementById("btnq")
let button = document.querySelector('#button');
let msg = document.querySelector('#message');
var categoryName="null"

btn.addEventListener("click", function(e){

    e.preventDefault()
    console.log("\n \n working here   ----------------------   \n")
})




var a = document.getElementById('category');
function getCategoryName(){
a.addEventListener('change', function() {
   categoryName=this.value +""
   categoryName=categoryName
  return categoryName
  
}, false);
}









var categoryTwo=getCategoryName()
  
button.addEventListener('click', ()=>{
    console.log(getCategoryName())
  msg.classList.toggle('reveal');
  $.ajax({
    method: 'GET',
   
    url: 'https://api.api-ninjas.com/v1/quotes?category=' + `${categoryName}` ,
    headers: { 'X-Api-Key': 'MHif+qM6v2TdYPIKedAsng==Zb6P6CtiU610KjVF'},
    contentType: 'application/json',
    success: function(result) {
     console.log(result)
       var quoteContent= result[0].quote
       var quoteAuthor=result[0].author   
        document.getElementById("message").innerHTML = quoteContent
        document.getElementById("auth").innerHTML=quoteAuthor
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});
 

})

