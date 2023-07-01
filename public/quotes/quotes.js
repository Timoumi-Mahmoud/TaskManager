//const btnq= document.getElementById('btnQuotes');
const btn = document.getElementById("btnq")

btn.addEventListener("click", function(e){

    e.preventDefault()
    console.log("\n \n working here   ----------------------   \n")
})




var categoryy="null"



var a = document.getElementById('category');
function getCategory(categoryy){
a.addEventListener('change', function() {
    console.log(this.value)
   categoryy=this.value
   console.log("indside the funct    "+ categoryy)

  return categoryy
  console.log(categoryy)
  //alert(this.value);
  
}, false);
}


 categoryy = getCategory();
console.log( "the value is :  "+ categoryy)




let button = document.querySelector('#button');
let msg = document.querySelector('#message');

button.addEventListener('click', ()=>{
  msg.classList.toggle('reveal');
  $.ajax({
    method: 'GET',
   
    url: 'https://api.api-ninjas.com/v1/quotes?category=' +"car" ,
    headers: { 'X-Api-Key': 'MHif+qM6v2TdYPIKedAsng==Zb6P6CtiU610KjVF'},
    contentType: 'application/json',
    success: function(result) {
        // console.log("result is"+ result);
        // var quotes=JSON.stringify(result)
        // console.log("stringfy:    "+ quotes["quote"])
    //  var temp=Object.values(result[0].quote)
    let temp=getCategory()
    console.log( "the value is :  "+ temp)

     console.log(result[0].quote)
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

