<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->




<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Simple Chat App</h3>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#description">Description</a></li>
        <li><a href="#folder-structure">Folder Structure</a></li>
        <li><a href="#main-libraries-used">Main Libraries Used</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>





<!-- ABOUT THE PROJECT -->
## About The Project

### Description

This is a simple chat app. The app consists of three screens. a login screen, where the user can sign in using their google account. The main screen gives an overview of each chatroom the user can enter. The Third screen is where the user can type to chat with other users.

<img src="https://user-images.githubusercontent.com/84104310/136424526-5e815eef-cd8b-4a4f-8dca-a611b9a6bc82.jpg" width="30%"></img> <img src="https://user-images.githubusercontent.com/84104310/136424544-4e85b9b4-eeca-4d33-b435-b272055c700b.jpg" width="30%"></img> <img src="https://user-images.githubusercontent.com/84104310/136424573-a3f2d8b1-1142-44b3-964e-ec1662707f9a.jpg" width="30%"></img> 

This app currently only works on android devices since I'm lacking the necessary development tools to build for iOS

### Folder Structure

Below is a general overview of how the project is structured. Any reuseable part, such as constants, hooks, components and so on are placed under the shared folder. The navigation folder contains the sole component that handles navigation. The Screens folder consists of sub folders that each contain everything related to one specific screen. The components within each of the screen sub folders are built using the reusable elements from the shared folder whenever possible.

I have found that this way of structuring a project gives me the best overview while also clearly delineating what code belongs where.

    ├── src                   
    │   ├── navigation            # Navigation contains files related to managing navigation  
    │   ├── shared                # Contains anything that is reuseable by the main components (components, constants, custom hooks, queries, redux...)
    │   ├── screens               # The Screens folder contains every component that makes up a screen within the app
    │   │   ├── ChatRoom          # Contains the Chatroom screen component. Built using reusable parts from the shared folder along with child components specific to itself
    │   │   ├── Login             # Contains the Login screen component. Built using reusable parts from the shared folder along with child components specific to itself
    │   │   ├── Main              # Contains the Main screen component. Built using reusable parts from the shared folder along with child components specific to itself
    


### Main Libraries Used

Below I have listed the main libraries used for this project along with their purpose.

* []() Redux Toolkit for cleaner state management.
* []() Firebase for handling login and firestore for storing infomation about users, chatrooms and messages sent.
* []() Styled Components for cleaner and more readable styling.



<!-- GETTING STARTED -->

## Getting Started

### Dependencies

If you haven't yet set up your development environment, follow the steps outlined in the documentation linked below

https://reactnative.dev/docs/environment-setup

### Installation

To get a local copy up and running follow these steps.

1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start Metro by running the command below inside your React Native project folder:
   ```sh
   npx react-native start
   ```
4. Start the application by opening a new terminal and running the command below inside your React Native project folder
   ```sh
   npx react-native run-android
   ```
   
<!-- CONTACT -->

## Contact

My Name - Matias Hougaard Andreasen

Email - matias.hougaard.andreasen@gmail.com


<!-- MARKDOWN LINKS & IMAGES -->