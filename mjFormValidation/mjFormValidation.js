/****************************************************************
 *	Class:		mjFormValidation								*
 *	Use:		real-time validation before submitting forms	*
 *	Author:		Michael Janea									*
 *				http://michaeljanea.com/						*
 *	Version:	2.0												*
 ****************************************************************/

var error_messages = {
	required 	: 'This field is required',
	email 		: 'Invalid e-mail address',
	numeric 	: [
		'This field must be numeric',
		'This field must be at least {minimum}',
		'This field must not exceed to {maximum}',
		'This field must be at least {minimum} and must not exceed to {maximum}'
	],
	url 		: 'Invalid URL',
	match 		: 'This field should match {match} field value'
};
var mjFormValidationWithError = submitted = false;
var mjFormValidationErrMsg = '';
(function($){
    $.fn.mjFormValidation = function(options){
        return this.each(function(){
            $(this).on('submit', function(){
                mjFormValidationWithError = false;
                submitted = true;
                $(this).find('.required').each(function(){
                    validateRequired($(this));
                });
                $(this).find('.email').each(function(){
                    if($(this).val() != ''){
                        validateEmail($(this));
                    }
                });
                $(this).find('.numeric').each(function(){
                	validateNumeric($(this));
                });
                $(this).find('.url').each(function(){
                	validateURL($(this));
                });
                $(this).find('.match').each(function(){
                	validateMatch($(this));
                });
                if(mjFormValidationWithError){
                    return false;
                }
            });
            $(this).find('.required, .email, .numeric, .url, .match').on('focus', function(){
                removeValidation($(this));
            });
            $(this).find('.required').on('blur', function(){
                validateRequired($(this));
            });
            $(this).find('.email').bind('blur keyup', function(){
                if($(this).val() != ''){
                    validateEmail($(this));
                }
            });
            $(this).find('.numeric').bind('blur keyup', function(){
				validateNumeric($(this));
            });
            $(this).find('.numeric').on('keydown', function(e){
                if(!e.shiftKey){
                    var theKey = String.fromCharCode(e.keyCode);
                    if(/[^0-9-()+\d]/.test(theKey) == true & e.keyCode != 8 & e.keyCode != 9 & e.keyCode != 37 & e.keyCode != 38 & e.keyCode != 39 & e.keyCode != 40 & e.keyCode != 96 & e.keyCode != 97 & e.keyCode != 98 & e.keyCode != 99 & e.keyCode != 100 & e.keyCode != 101 & e.keyCode != 102 & e.keyCode != 103 & e.keyCode != 104 & e.keyCode != 105 & e.keyCode != 190 & e.keyCode != 110){
                        e.preventDefault();
                    }
                }else{
                    e.preventDefault();
                }
            });
            $(this).find('.url').bind('blur keyup', function(){
				validateURL($(this));
            });
            $(this).find('.match').bind('blur keyup', function(){
				validateMatch($(this));
            });
        });
    }
}(jQuery));

function validateRequired(el){
    if($(el).val() == '' || $(el).val() == null){
        mjFormValidationWithError = true;
        mjFormValidationErrMsg = error_messages.required;
        fnError($(el));
    }else{
    	if(!$(el).hasClass('email') && !$(el).hasClass('numeric') && !$(el).hasClass('url')){
        	removeValidation($(el));
    	}
    }
};

function validateEmail(el){
    if(/^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/.test($(el).val()) == false){
        mjFormValidationWithError = true;
        mjFormValidationErrMsg = error_messages.email;
        fnError($(el));
    }else{
        removeValidation($(el));
    }
};

function validateNumeric(el){
	if($(el).val() != ''){
		if((!isNaN(parseFloat($(el).val())) && isFinite($(el).val())) == false){
			mjFormValidationWithError = true;
			mjFormValidationErrMsg = error_messages.numeric[0];
		}else{
			if($(el).attr('data-minimum') && !$(el).attr('data-maximum') && parseFloat($(el).val()) < parseFloat($(el).attr('data-minimum'))){
				mjFormValidationWithError = true;
				mjFormValidationErrMsg = error_messages.numeric[1].replace('{minimum}', $(el).attr('data-minimum'));
				fnError($(el));
			}else if($(el).attr('data-maximum') && !$(el).attr('data-minimum') && parseFloat($(el).val()) > parseFloat($(el).attr('data-maximum'))){
				mjFormValidationWithError = true;
				mjFormValidationErrMsg = error_messages.numeric[2].replace('{maximum}', $(el).attr('data-maximum'));
				fnError($(el));
			}else if($(el).attr('data-maximum') && $(el).attr('data-minimum') && (parseFloat($(el).val()) > parseFloat($(el).attr('data-maximum')) || parseFloat($(el).val()) < parseFloat($(el).attr('data-minimum')))){
				mjFormValidationWithError = true;
				mjFormValidationErrMsg = (error_messages.numeric[3].replace('{minimum}', $(el).attr('data-minimum'))).replace('{maximum}', $(el).attr('data-maximum'));
				fnError($(el));
			}else{
				removeValidation($(el));
			}
		}
	}else{
		if(!$(el).hasClass('required')){
			removeValidation($(el));
		}
	}
};

function validateURL(el){
	if($(el).val() != ''){
		if(!/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test($(el).val())){
			mjFormValidationWithError = true;
			mjFormValidationErrMsg = error_messages.url;
			fnError($(el));
		}else{
			removeValidation($(el));
		}
	}else{
		if(!$(el).hasClass('required')){
			removeValidation($(el));
		}
	}
};

function validateMatch(el){
	if($(el).val() != $('[name=' + $(el).attr('data-match-field') + ']').val()){
		mjFormValidationWithError = true;
		mjFormValidationErrMsg = error_messages.match.replace('{match}', $(el).attr('data-match-field-label'));
		fnError($(el));
	}else{
		removeValidation($(el));
	}
};

function removeValidation(el){
    $(el).closest('.form-group').removeClass('has-error');
    $(el).siblings('.validation').slideUp(400, function(){
        $(this).remove();
    });
};

function fnError(el){
    if($(el).siblings('.validation').length == 0){
        $(el).parent().append('<div class="validation">' + mjFormValidationErrMsg + '</div>');
        $(el).closest('.form-group').addClass('has-error');
        $(el).siblings('.validation').stop(true, true).slideDown(400);
    }
    $('.validation').on('click', function(){
        $(this).siblings().first().focus();
    });
};