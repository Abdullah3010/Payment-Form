
///////////////////Visa error messages//////////////////////////////
const errorVisaName = document.getElementById("error-visa-name");
const errorVisaCard = document.getElementById("error-visa-card");
const errorVisaExpiration = document.getElementById("error-visa-expiration");
const errorVisaCVV = document.getElementById("error-visa-CVV");
////////////////////////////////////////////////////////////////////

//////////////////vodafone error message////////////////////////////
const errorVodafonCard = document.getElementById("error-vodafon-card");
const errorVodafonExpiration = document.getElementById("error-vodafon-expiration");
const errorVodafonCVV = document.getElementById("error-vodafon-CVV");
////////////////////////////////////////////////////////////////////

// current date
var d = new Date();
var yy = d.getFullYear().toString().slice(-2);

$(function() {

	//switch to credit card form
	$("#credit").click(function(){
		switchBetweenForms($("#sec1"),$("#sec2"),$("#sec3"));
		
		$(this).addClass("selected");
		$("#vodafon").removeClass("selected");
		$("#aman").removeClass("selected");
	});

	//switch to vodafone cash form
	$("#vodafon").click(function(){
		switchBetweenForms($("#sec2"),$("#sec3"),$("#sec1"));
		
		$(this).addClass("selected");
		$("#credit").removeClass("selected");
		$("#aman").removeClass("selected");
	});

	//switch to aman form
	$("#aman").click(function(){
		switchBetweenForms($("#sec3"),$("#sec1"),$("#sec2"));
		
		$(this).addClass("selected");
		$("#vodafon").removeClass("selected");
		$("#credit").removeClass("selected");
	});


	//to check name while typing
	$("#visa-full-name").keyup(function(){
		checkNameOnKeyUp($(this),errorVisaName);
	});

	//to check credit card number on blur
	$("#visa-card-number").blur(function(){
		chaeckCardnumber($(this),errorVisaCard);
	});


	//to check vodafon card number on blur
	$("#vodafon-card-number").blur(function(){
		chaeckCardnumber($(this),errorVodafonCard);
	});


	//to check credit card number while typing
	$("#visa-card-number").keyup(function(){
		chaeckCardnumberOnKeyUp($(this),errorVisaCard);
	});

	//to check vodafone card number while typing
	$("#vodafon-card-number").keyup(function(){
		chaeckCardnumberOnKeyUp($(this),errorVodafonCard);
	});
	
	//check credit card form
	$("#vSubmit").click(function(){
		checkNamedOnBlur($("#visa-full-name"),errorVisaName);
		chaeckCardnumber($("#visa-card-number"),errorVisaCard);
		chaeckExpiration($("#visa-mm"),$("#visa-yy"),errorVisaExpiration);
		checkCVV($("#visa-cvv-number"),errorVisaCVV);
	});

	//check vodafon cash form
	$("#voSubmit").click(function(){
		chaeckCardnumber($("#vodafon-card-number"),errorVodafonCard);
		chaeckExpiration($("#vodafon-mm"),$("#vodafon-yy"),errorVodafonExpiration);
		checkCVV($("#vodafon-cvv-number"),errorVodafonCVV);
	});
});


//////////////////////FUNCTIONS///////////////////////////


/********************check name**************************/
function checkNameOnKeyUp(element,errorElement){
	if(element.val() == ""){
		errorElement.textContent="The name should not be embty";
        element.addClass("invalid");
	} else if (/^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z ]*$/.test(element.val())) {
        errorElement.textContent="";  
        element.removeClass("invalid");

    } else {
        errorElement.textContent="The name should include only letters";
        element.addClass("invalid");
    }
}
function checkNamedOnBlur(element,errorElement){
    if(element.val().length == 0) {
        errorElement.textContent = "This field is required";
        element.addClass("invalid");
        return false;
    } else if (/^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z ]*$/.test(element.val())) {
        errorElement.textContent="";  
        element.removeClass("invalid");
        return true;
    } else {
        errorElement.textContent="The name should include only letters";
        element.addClass("invalid");
        return false;
    }
}
/**********************************************************/


/********************check card number*********************/
function chaeckCardnumber(element,errorElement){
	//visa 
  	var visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  	//master
  	var namster = /^(?:5[1-5][0-9]{14})$/;
  	if (element.val() == ""){
  		element.addClass("invalid");
		errorElement.textContent="Credit card number must not be embty";
		return false;
  	} else if(visa.test(element.val())){
  		element.removeClass("invalid");
  		errorElement.textContent="";
		return true;
	} else if(namster.test(element.val())){
		element.removeClass("invalid");
		errorElement.textContent="";
		return true;
	} else {
		element.addClass("invalid");
		errorElement.textContent="Not a valid credit card number";
		return false;
	}
}

function chaeckCardnumberOnKeyUp(element,errorElement){

	if(/[^0-9]/.test(element.val())){
		element.addClass("invalid");
		errorElement.textContent="Not a valid credit card number";
		return false;

	} else {
		element.removeClass("invalid");
		errorElement.textContent="";
		return true;		
	}
}
/**********************************************************/

/********************chaeck expiration*********************/
function chaeckExpiration(elementM,elementY,errorElement){
	if(elementM.val() == "" && elementY.val() == "") {
		elementY.addClass("invalid");
		elementM.addClass("invalid");
		errorElement.textContent="Month and year must not be embty";
		return false;
	}else if(elementM.val() == ""){
		elementM.addClass("invalid");
		errorElement.textContent="Month must not be embty";
		return false;

	} else if(elementY.val() == "") {
		elementY.addClass("invalid");
		errorElement.textContent="Year must not be embty";
		return false;

	} else if(elementM.val().length > 2 ||/[^0-9]/.test(elementM.val()) || elementM.val()>12 || elementM.val()<1 
		&& elementY.val().length != 2 || /[^0-9]/.test(elementY.val()) || elementY.val() < yy){

		if(elementM.val().length > 2 ||/[^0-9]/.test(elementM.val()) || elementM.val()>12 || elementM.val()<1) {
			elementM.addClass("invalid");
			errorElement.textContent="Not a valid month";
		}
		if(elementY.val().length != 2 || /[^0-9]/.test(elementY.val()) || elementY.val() < yy) {
			elementY.addClass("invalid");
			errorElement.textContent="Not a valid year";
		}
		return false;
	} else {
		elementY.removeClass("invalid");
		elementM.removeClass("invalid");
		errorElement.textContent="";
		return true;
	}
}
/**********************************************************/


/********************chaeck CVV***************************/
function checkCVV(element,errorElement){

	var regex = /^[0-9]{3,4}$/;
	if (regex.test(element.val())) {
		element.removeClass("invalid");
  		errorElement.textContent="";
		return true;
	} else if(element.val() == ""){
		element.addClass("invalid");
		errorElement.textContent="CVV must not be embty";
		return false;
	} else {
		element.addClass("invalid");
		errorElement.textContent="Not a valid CVV number!";
		return false;
	}
}
/**********************************************************/


/******************validate visa form***********************/
function validateVisaForm() {

	if (checkNamedOnBlur($("#visa-full-name"),errorVisaName) &&
		chaeckCardnumber($("#visa-card-number"),errorVisaCard) &&
		chaeckExpiration($("#visa-mm"),$("#visa-yy"),errorVisaExpiration)&&
		checkCVV($("#visa-cvv-number"),errorVisaCVV)) {
		return true;
	} else{
		return false;
	}
}


/******************validate vodafone form***********************/
function validateVodafonForm() {
	if (chaeckCardnumber($("#vodafon-card-number"),errorVodafonCard) &&
		chaeckExpiration($("#vodafon-mm"),$("#vodafon-yy"),errorVodafonExpiration)&&
		checkCVV($("#vodafon-cvv-number"),errorVodafonCVV)) {
		return true;
	} else{
		return false;
	}
}


/*********************switch forms*****************************/
function switchBetweenForms(visible,invisible1,invisible2){
	invisible1.fadeOut(200,function(){
		$(this).addClass("display");
		invisible2.fadeOut(200,function(){
			$(this).addClass("display");
			visible.fadeIn(400,function(){
				$(this).removeClass("display");
			});
		});
	});
			
}