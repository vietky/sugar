# SUGAR

### DEV
- ```npm i```
- ```export GOOGLE_APPLICATION_CREDENTIALS="<ur_path>/storage_admin_sa.json"```
- ```npm run dev```

### DEPLOY
- ```gcloud app deploy```

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