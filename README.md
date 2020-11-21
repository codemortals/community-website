# Code Mortals

Welcome to the Code Mortals Community Website project.

- Node JS
- Angular
- Google Cloud Platform

## Setting up project

 **1.** **Fork** this project by clicking the _Fork_ button on top right corner of this page.

 **2.** **Clone** the repository by running following command in [git](https://git-scm.com/):
 ```sh
 $ git clone https://github.com/[YOUR-USERNAME]/community-website.git
 ```

## Development

- Checkout project
- Install dependencies `npm i`
- Configure Firebase Authentication using to use GitHub (follow Firebase instructions)
- Setup local configuration (see /src/environments/environment.ts for more)

## Deployment

Circle CI is used to deploy changes automatically on successful build and test execution.

Firestore rules can be deployed with `npx firebase deploy --project codemortals-website-develop --only firestore:rules`.

Note: Ensure you have logged into GCP on your local machine `npx firebase login`.
