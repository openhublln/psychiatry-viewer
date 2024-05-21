OpenHub - IoNS visualization tool - release 25th July 2023

INSTRUCTIONS :

Copy the release zip file to desktop
Unzip the file
Start the application by double click the file 'Psychiatry_Dashboard_start.bat'. A window with a black background open. Don't close the window. If you close the window, the application is stopped.

To activate the Test Admin account :
 Note: For a new release, you MUST remove all your accounts in Authenticator and create new accounts for the release.
 - Install the 'Microsoft Authenticator app' on your phone
 - Open the browser with URL: http://localhost:3000/registration/123456
 - Read the barcode with the Microsoft Authenticator:
   -- Select the '+' button
   -- Go to the 'Personal account'
   -- Select 'QR-Code scan'
Once the admin account has been created, enter the code in the box below the barcode.

These are the instructions to activate a mock/fake admin account to try out the two-factor authentication. With this account, you can now play the role of the admin of the app. This is likely not how it will work under real production.  

Create a new account:
Note: For a new release, you MUST remove all your accounts in Authenticator and create new accounts for the release.
 - Open the browser with URL: http://localhost:3000/
 - Login as admin with username 'admin' and password 'admin'
 - Enter the authentication code, you can get the code in your authenticator app for the 'admin' account on your phone.
 - Follow the process to create a new account for a new user

You can now log out and log back in as the new user for which an account was just created by the admin. 

Note: 
1) May not work. I have not tested on another PC
2) The fake medical data is provided in the test version.
3) Other features still are in development.