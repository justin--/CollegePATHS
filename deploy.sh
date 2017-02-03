rm ./myapp.zip
zip ./myapp.zip -r * .[^.]*
read ver < version.txt
echo "$((ver + 1))" > version.txt
eb deploy -l "CollegePATHS_1.0.0.$ver"