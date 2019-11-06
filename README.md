# SUGAR

### DEV
- ```npm i```
- ```export GOOGLE_APPLICATION_CREDENTIALS="<ur_path>/storage_admin_sa.json"```
- ```./cloud_sql_proxy -instances=dev-racer-252811:asia-southeast1:sugardb=tcp:5432 -credential_file=$GOOGLE_APPLICATION_CREDENTIALS```
- ```npm run dev```

### DEPLOY
- ```gcloud app deploy```
- 35.240.151.186

### TO-DO
```
Backend:
- api to insert ads:
    - title
    - voiceTitleFile => google file storage
    - subject
    - voiceSubjectFile => google file storage
    - ImageList = [imagePath1, imagePath2, …] => google file storage
    - category
    - created_date
    - updated_date
- stream voice ads
- api to display ads:
    - list ad
        - sort by created_date asc/desc
        - shuffle ads!?
    - ad view:
        - ???

- deploy to google cloud
```