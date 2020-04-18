## uploads functions to lambda
## MUST RUN FROM ROOT DIRECTORY OF FUNCTION

zip -r function.zip *
aws lambda update-function-code  --function-name principles --zip-file fileb://function.zip
