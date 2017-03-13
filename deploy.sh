[-e ./myapp.zip] && rm ./myapp.zip
zip -9 -r --exclude=*.git*  ./myapp.zip ./
read ver < version.txt
echo "$((ver + 1))" > version.txt
eb deploy -l "CollegePATHS_1.0.0.$ver"
rm ./myapp.zip