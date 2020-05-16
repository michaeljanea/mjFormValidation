# mjFormValidation

Real-time validation before submitting your forms for Bootstrap.
Compatible with Bootstrap 3.0 and up.

## How To Install
1. Extract the downloaded zip file (mjFormValidation.zip)
2. Insert below codes to the <head> section of your page
`<link rel="stylesheet" type="text/css" href="mjFormValidation.css" />`
3. Insert below codes before the </body> tag of your page
```html
<script type="text/javascript" src="jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="mjFormValidation.js"></script>
<script type="text/javascript">
$(function(){
    $('form').mjFormValidation({
        error_messages : {
            required    : 'This field is required',
            email       : 'Invalid e-mail address',
            numeric     : [
                'This field must be numeric',
                'This field must be at least {minimum}',
                'This field must not exceed to {maximum}',
                'This field must be at least {minimum} and must not exceed to {maximum}'
            ],
            url         : 'Invalid URL',
            match_field : 'This field should match {match} field value'
        }
    });
});
</script>
```
4. Add the following classes according to your preferences:
	- required – to validate required fields
	- email – to validate e-mail address fields
	- numeric – to validate numeric fieldsAdditional options (element attributes):
		- data-minimum – minimum value for numeric field
		- data-maximum – maximum value for numeric field
	- url – to validate url fields
	- match – to validate if two fields are matchedAdditional options (element attributes)
		- data-match-field – name attribute of the element you want the field to match
		- data-match-field-label – label of the field you want to match

## LOGS

##### Version 2.1.2
CHANGED: .size() to .length to adopt latest jQuery function
FIXED: match validation error

------------
##### Version 2.1.1
FIXED: validation for checkboxes and radio buttons bug

------------
##### Version 2.1
ADDED: validation for checkboxes and radio buttons

------------
##### Version 2.0
ADDED: validation for URLs
ADDED: validation for matching two fields value
ADDED: error messages customization
RENAMED: “digits” class to “numeric” class
FIXED: validation for mixed classes

------------
##### Version 1.0
Initial release