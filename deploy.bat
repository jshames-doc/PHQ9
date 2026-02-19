@echo off
SETLOCAL
SET SERVICE_NAME=phq3-screening
SET REGION=me-west1
SET PROJECT_ID=gen-lang-client-0026629090

echo ====================================================
echo   PHQ-3 Screening - Cloud Run Deployment
echo ====================================================
echo.
echo Project: %PROJECT_ID%
echo Service: %SERVICE_NAME%
echo Region:  %REGION%
echo.
echo [1/2] Verifying Google Cloud login...
call gcloud config set project %PROJECT_ID%

echo.
echo [2/2] Deploying to Cloud Run...
echo This may take a few minutes (building container)...
echo.

call gcloud run deploy %SERVICE_NAME% ^
  --source . ^
  --platform managed ^
  --region %REGION% ^
  --allow-unauthenticated

echo.
echo ====================================================
echo   Deployment Process Finished
echo ====================================================
pause
